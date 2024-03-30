// Edit page
import React from "react";
import { notFound } from "next/navigation";
import { getAuther } from "@/libs/getAuther";
import { getImagesForStory, getCompletedSlides } from "@/libs/image-services";
import { getStoriesById } from "@/libs/story-service";
import ExacalidrawEditor from "./components/Excalidraw";
import SubmitMessage from "./components/SubmittMessage";
interface PageProps {
  params: {
    storyId: string;
  };
  searchParams: {
    pageNo: Number;
  };
}
export default async function Page({
  params: { storyId },
  searchParams: { pageNo },
}: PageProps) {
  // get story by id
  const story = await getStoriesById(storyId);

  // get all the images for a given slide
  const images = await getImagesForStory(storyId);
  // get user
  const self = await getAuther();
  // get all the completed slides
  const slidesDone = await getCompletedSlides(storyId);
  // if not story not found
  if (story === undefined) notFound();
  // if story submit
  if (images === null) return <SubmitMessage />;
  return (
    story &&
    images &&
    self &&
    slidesDone && (
      <>
        <ExacalidrawEditor
          pageNo={pageNo}
          data={images}
          self={self}
          story={story}
          completedSlide={slidesDone}
        />
      </>
    )
  );
}
