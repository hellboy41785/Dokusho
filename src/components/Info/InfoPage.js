import React from "react";
import { useInfoQuery } from "@/query/useNovelupQuery";
import Error from "@/Error/Error";
import TopStyle from "./TopStyle/TopStyle";
import Chapters from "./Chapters/Chapters";
import Review from "./Review/Review";
import InfoLoader from "@/Loader/InfoLoader";


const InfoPage = ({ slug }) => {
  const { data, isLoading, isError } = useInfoQuery({ slug: slug });
  if (isLoading) return <InfoLoader/>;
  if (isError) return <Error />;
  return (
    <div className="flex flex-col gap-4 p-2">
      <TopStyle data={data} />
      <Chapters slug={data.id} totalPage={data.chapterTotalPage} />
      <Review reviews={data.reviews} />
    </div>
  );
};

export default InfoPage;
