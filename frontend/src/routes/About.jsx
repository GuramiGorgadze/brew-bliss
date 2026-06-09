import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle, StoreFeatures, BrandCarousel, InstagramCarousel } from '../components';
import AboutBanner from '../assets/about-banner.webp';
import wing1 from '../assets/wing1.png';
import wing2 from '../assets/wing2.png';
import Team1 from '../assets/team/team01.png';
import Team2 from '../assets/team/team02.png';
import Team3 from '../assets/team/team03.png';
import Team4 from '../assets/team/team04.png';
import { useLoader } from '../context/LoaderContext';

function About() {
  const { useFakeLoader } = useLoader();
  const { t, i18n } = useTranslation();
  useEffect(() => useFakeLoader(), []);

  const teamMembers = [
    {
      id: 1,
      imgSrc: Team1,
      title: t('about.team.member1.title'),
      description: t('about.team.member1.description'),
    },
    {
      id: 2,
      imgSrc: Team2,
      title: t('about.team.member2.title'),
      description: t('about.team.member2.description'),
    },
    {
      id: 3,
      imgSrc: Team3,
      title: t('about.team.member3.title'),
      description: t('about.team.member3.description'),
    },
    {
      id: 4,
      imgSrc: Team4,
      title: t('about.team.member4.title'),
      description: t('about.team.member4.description'),
    },
  ];

  return (
    <div>
      <PageTitle pageName={t('about.pageTitle')} />

      <div className="our-story">
        <div className="our-story__title">
          <img
            src={wing1}
            alt=""
            className="our-story__wing"
          />
          <p>{t('about.ourStory.label')}</p>
          <img
            src={wing2}
            alt=""
            className="our-story__wing"
          />
        </div>

        <h3 className="our-story__desc">
          {t('about.ourStory.descStart')}{' '}
          <span className="orange">{t('about.ourStory.brandName')}</span>{' '}
          {t('about.ourStory.descEnd')}
        </h3>

        <img
          src={AboutBanner}
          alt=""
          className="our-story__banner"
        />
      </div>

      <StoreFeatures />

      <div className="team">
        <div className="team__title">
          <img
            src={wing1}
            alt=""
            className="team__wing"
          />
          <p>{t('about.team.label')}</p>
          <img
            src={wing2}
            alt=""
            className="team__wing"
          />
        </div>

        <p className="team__desc">{t('about.team.desc')}</p>

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

      <BrandCarousel />
      <InstagramCarousel />
    </div>
  );
}

export default About;
