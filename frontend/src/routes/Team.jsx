import { useEffect } from 'react';
import { PageTitle, InstagramCarousel } from '../components';
import AboutBanner from '../assets/about-banner.webp';
import wing1 from '../assets/wing1.png';
import wing2 from '../assets/wing2.png';
import Team1 from '../assets/team/team01.png';
import Team2 from '../assets/team/team02.png';
import Team3 from '../assets/team/team03.png';
import Team4 from '../assets/team/team04.png';
import { useLoader } from '../context/LoaderContext';

function Team() {
  const { useFakeLoader } = useLoader();
  useEffect(() => useFakeLoader(), []);

  const teamMembers = [
    {
      id: 1,
      imgSrc: Team1,
      title: 'Emily Johnson',
      description: 'Founder/CEO',
    },
    {
      id: 2,
      imgSrc: Team2,
      title: 'Michael Brown',
      description: 'Customer Service Manager',
    },
    {
      id: 3,
      imgSrc: Team3,
      title: 'Sarah Davis',
      description: 'Marketing Specialist',
    },
    {
      id: 4,
      imgSrc: Team4,
      title: 'Sophia Martinez',
      description: 'Art Curator',
    },
  ];
  return (
    <div>
      <PageTitle pageName="Our Team" />

      <div
        className="team"
        style={{ marginBottom: 100 }}
      >
        <div className="team__title">
          <img
            src={wing1}
            alt=""
            className="team__wing"
          />
          <p>Meet Our Team Members</p>
          <img
            src={wing2}
            alt=""
            className="team__wing"
          />
        </div>

        <p className="team__desc">
          See why everyone’s raving about our products and service – real stories <br /> from happy
          customers!
        </p>

        <div className="team__cards">
          {teamMembers.map((tm8) => (
            <div
              key={tm8.id}
              className="team__cards__card"
            >
              <img
                src={tm8.imgSrc}
                alt=""
                className="team__cards__card__img"
              />

              <div className="team__cards__card__content">
                <h3 className="team__cards__card__title">{tm8.title}</h3>
                <p className="team__cards__card__text">{tm8.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <InstagramCarousel />
    </div>
  );
}

export default Team;
