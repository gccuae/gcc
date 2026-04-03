"use client";

import { SecondSectionItemData } from "./type";
import KeyFactsGrid from "./KeyFactsGrid";

const KeyFacts = ({ data }: { data: SecondSectionItemData['numberSection'] }) => {
    return (
        <section className=" pb-57px  bg-white dark:bg-light-dark">
            <div className="container">
                {data?.items?.length ? <KeyFactsGrid items={data.items} /> : null}
            </div>
        </section>
    );
};

export default KeyFacts;
