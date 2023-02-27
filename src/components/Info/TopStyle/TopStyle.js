/* eslint-disable @next/next/no-img-element */
import Tags from "./Tags";
import React from "react";
import Creator from "./Creator";
import { Tag } from "lucide-react";
import Recommendation from "./Recommendation";
import BookMark from "./BookMark";

const TopStyle = ({ data }) => {
  return (
    <div className="flex flex-col w-full gap-2 lg:flex-row ">
      <div className="w-full md:w-2/6">
        <img
          className="object-cover rounded-md lg:min-w-[500px] min-h-[700px] max-h-[700px]"
          src={data.img}
          alt="cover"
        />
      </div>
      <div className="flex flex-col gap-4 bg-[#2c3441] rounded-md p-1 w-full">
        <h1 className="text-2xl font-bold">{data.title}</h1>
        {/* Associated Name */}
        <div>
          <h1 className="font-sans text-lg font-semibold">Alternative Name</h1>
          <div className="space-y-2 border-t border-b">
            {data.associatedNames.map((el, i) => (
              <h1 className="text-md" key={i}>
                {el}
              </h1>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-2 cursor-pointer lg:flex-row">
          <Tags type="Genres" data={data.genres} />
          <Tags type="Tags" data={data.tags} />
        </div>

        <div className="grid grid-cols-3 gap-1 cursor-pointer lg:grid-cols-6">
          <h1 className="p-2 text-center rounded bg-primary-focus">{data.type}</h1>
          <h1 className="p-2 text-center rounded bg-primary-focus">
            {data.language}
          </h1>
          <h1 className="p-2 text-center rounded bg-primary-focus">
            {data.rating.replace(/[()]/g, "")}
          </h1>
          <h1 className="p-2 text-center rounded bg-primary-focus">{data.year}</h1>
          <h1 className="p-2 text-center rounded bg-primary-focus">
            Translated : {data.completelyTranslated}
          </h1>
          <h1 className="p-2 text-center rounded bg-primary-focus">
            Licensed : {data.licensed}
          </h1>

          <Creator type="Artists" data={data.artists} />
          <Creator type="Authors" data={data.authors} />
          <h1 className="col-span-3 lg:col-span-2 p-2 text-center rounded bg-primary-focus">
            EnglishPublisher : {data.englishPublisher}
          </h1>
          <Recommendation data={data.recommendation}/>
          <h1 className="p-2 text-center rounded col-span-full bg-primary-focus">
           Chapters : {data.status}
          </h1>
        </div>

        {/* Description */}
        <section className=" h-full">
          <h1 className="font-sans text-lg font-semibold">Description</h1>
          <p className="border-t text-md">{data.description}</p>
        </section>
        <BookMark data={data}/>
      </div>
    </div>
  );
};

export default TopStyle;
