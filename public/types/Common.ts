

export type Home =
   {
    metaTitle: string,
    metaDescription: string,
    banners: [
      {
        image: string,
        imageAlt: string,
        title: string
      }
    ],
    aboutSection: {
      title: string,
      description: string,
      image: string,
      items: [
        {
          number: string,
          value: string
        }
      ]
    },
    partners: {
      title: string,
      items: [
        {
          image: string,
          imageAlt: string
        }
      ]
    },
    services: {
      title: string,
      items: [
        {
          image: string,
          imageAlt: string
          title: string
          description: string
          url: string
        }
      ]
    },
    systems: {
      title: string,
      items: [
        {
          image: string,
          imageAlt: string,
          title: string
        }
      ]
    },
    certifications: {
      title: string,
      items: [
        {
          image: string,
          imageAlt: string
          link: string
        }
      ]
    },
    projects: {
      title: string,
      description: string
    },
    socials: {
      title: string,
      email: string,
      phone: string,
      items: [
        {
          title: string,
          link: string
        }
      ]
    }
  }
export type About =
    {
    banner: string,
    bannerAlt: string,
    metaTitle: string,
    metaDescription: string,
    pageTitle: string,
    title?: string,
    firstSection: {
      title: string,
      description: string,
      image: string,
      imageAlt: string
    },
    secondSection: {
      title: string,
      description: string,
      mission: {
        logoAlt: string,
        logo: string,
        description: string
      },
      vision: {
        logoAlt: string,
        logo: string,
        description: string
      },
      values: {
        logoAlt: string,
        logo: string,
        description: string
      }
    },
    thirdSection: {
      title: string,
      description: string,
      chairman: {
        imageAlt: string,
        image: string,
        name: string,
        description: string
      },
      ceo: {
        imageAlt: string,
        image: string,
        name: string,
        description: string
      }
    },
    certifications: [
      {
        title: string,
        image: string,
        imageAlt: string
      }
    ]
  }

export type Clients =
    {
    metaTitle: string,
    metaDescription: string,
    pageTitle: string,
    banner: string,
    bannerAlt: string,
    title: string,
    description: string,
    clients: [
      {
        image: string,
        imageAlt: string
        link: string,
      }
    ]
  }

 export type Commitments =

  {
    banner: string,
    bannerAlt: string,
    pageTitle: string,
    title?: string,
    firstSection: {
      title: string,
      description: string,
      image: string,
      items: [
        {
          title: string,
          logo: string,
          logoAlt: string
        }
      ]
    },
    secondSection: {
      title: string,
      description: string,
      items: [
        {
          title: string,
          description: string,
          logo: string,
          logoAlt: string
        }
      ]
    },
    thirdSection: {
      title: string,
      description: string,
      items: [
        {
          title: string,
          description: string,
          image: string,
          imageAlt: string
        }
      ]
    },
    metaTitle: string,
    metaDescription: string
  }
export type Partners =
    {
    metaTitle: string,
    metaDescription: string,
    banner: string,
    accreditDescription: string,
    accreditTitle: string,
    bannerAlt: string,
    pageTitle: string,
    title: string,
    description: string,
    partners: [
      {
        name: string,
        description: string,
        logo: string,
        logoAlt: string,
        image: string,
        imageAlt: string,
        website: string
      }
    ],
    accredit: [
      {
        accreditImage: string,
        accreditImageAlt: string
      }
    ]
  }
export type Services =
    {
    metaTitle: string,
    metaDescription: string,
    banner: string,
    bannerAlt: string,
    pageTitle: string,
    title?: string,
    services: [
      {
        title: string,
        description: string,
        items: [
          {
            title: string,
            logo: string,
            logoAlt: string,
            description: string,
            image: string,
            imageAlt: string
          }
        ]
      }
    ]
  }
export type systems=
     {
    metaTitle: string,
    metaDescription: string,
    pageTitle: string,
    title: string,
    description: string,
    banner: string,
    bannerAlt: string,
    componentTitle: string,
    introTitle: string,
        introDescription: string,
    componentDescription: string,
         components: [
          {
            title: string,
            description: string,
            image: string,
            imageAlt: string
          }
        ],
    systems: [
      {
        image: string,
        imageAlt: string,
        title: string,
        description: string,
        logo: string,
        logoAlt: string,
        banner: string,
        bannerAlt: string,

        slug: string,
        metaTitle: string,
        metaDescription: string
      }
    ]
  }

export type Contact=
     {
    metaTitle: string,
    metaDescription: string,
    image: string,
    imageAlt: string,
    pageTitle: string,
    contacts: [
      {
        title: string,
        address: string,
        phone: string,
        email: string,
        buttonLink: string
      }
    ],
    socials: [
      {
        title: string,
        link: string
      }
    ]
  }

