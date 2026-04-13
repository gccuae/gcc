export type careerData = {
    metaTitle: string,
    metaDescription: string,
    firstSection: {
        hidden: boolean;
        pageTitle: string,
        description: string,
        image: string,
        imageAlt: string
    },
    secondSection: {
        hidden: boolean;
        mainTitle: string,
        subTitle: string
    },
    thirdSection: {
        hidden: boolean;
        title: string
    },
    departments: [{
        name: string
    }],
    locations: [{
        name: string
    }],
    openings: [{
        status: string;
        firstSection: {
            hidden: boolean;
            title: string,
            jobTitle: string,
            department: string,
            location: string,
            employmentType: string,
            slug: string
        },
        secondSection: {
            hidden: boolean;
            title: string,
            description: string
        },
        thirdSection: {
            hidden: boolean;
            title: string,
            description: string
        },
        forthSection: {
            hidden: boolean;
            title: string,
            description: string
        }
    }]
}
