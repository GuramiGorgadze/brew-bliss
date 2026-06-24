import Products from "../models/products.js";
import Users from "../models/users.js";
import jwt from "jsonwebtoken";
import Groq from "groq-sdk";

export const getProducts = async (req, res) => {
  try {
    const products = await Products.find();

    res.status(200).json({ data: products });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ err: "Product not found" });
    }

    res.status(200).json({ data: product });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ err: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ err: "Rating must be between 1 and 5" });
    }
    if (!comment || !comment.trim()) {
      return res.status(400).json({ err: "Comment is required" });
    }

    const user = await Users.findById(decoded.id).select("firstName lastName");
    if (!user) return res.status(404).json({ err: "User not found" });

    const product = await Products.findById(req.params.id);
    if (!product) return res.status(404).json({ err: "Product not found" });

    const review = {
      reviewer: `${user.firstName} ${user.lastName}`,
      rating,
      comment: comment.trim(),
    };

    product.reviews.push(review);

    const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    product.rating = totalRating / product.reviews.length;

    await product.save();

    const savedReview = product.reviews[product.reviews.length - 1];
    return res.status(200).json({ data: savedReview });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Something went wrong" });
  }
};

export const sommelier = async (req, res) => {
  try {
    const { messages, lang } = req.body;

    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ err: "Messages array is required" });
    }

    const products = await Products.find().select(
      "name description rating variants",
    );
    const productList = products
      .map((p) => {
        const prices = p.variants
          ?.filter((v) => v.available)
          .map((v) => `${v.size}: $${v.price}`)
          .join(", ");
        return `- ${p.name}: ${p.description} (Rating: ${p.rating?.toFixed(1) ?? "N/A"}/5, Prices: ${prices || "N/A"})`;
      })
      .join("\n");

    const systemPrompt = `You are an expert beer sommelier with deep knowledge of:
- Beer styles (ales, lagers, stouts, IPAs, sours, etc.)
- Food and beer pairings
- Brewing processes and ingredients
- Regional and craft beer recommendations
- Flavor profiles and tasting notes

You have access to our current beer catalog. When relevant, recommend beers from this list:
${productList}

Be conversational, enthusiastic, and helpful. Keep responses concise (2-4 sentences) unless the user asks for detail.
Respond in the user's language. Current language code: ${lang || "en"}.`;

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      ],
    });

    const reply = response.choices[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({ err: "No response from AI" });
    }

    return res.status(200).json({ data: reply });
  } catch (err) {
    console.error("Sommelier error:", err);
    return res
      .status(500)
      .json({ err: err.message || "Internal server error" });
  }
};

export const sommelierSuggestions = async (req, res) => {
  try {
    const { messages, lang } = req.body;
    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 150,
      messages: [
        {
          role: "system",
          content: `Based on this beer sommelier conversation, generate exactly 3 short follow-up question suggestions. 
                    Return ONLY a raw JSON array of 3 strings with no markdown, no backticks, no explanation. 
                    Output must start with [ and end with ]. Example: ["What food pairs with this?", "Any similar beers?", "Tell me more about IPAs"]. 
                    Respond in language: ${lang || "en"}.`,
        },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    });

    const raw = response.choices[0]?.message?.content || "[]";
    const clean = raw.replace(/```json|```/g, "").trim();
    const suggestions = JSON.parse(clean);
    return res.status(200).json({ data: suggestions });
  } catch (err) {
    return res.status(200).json({ data: [] });
  }
};
