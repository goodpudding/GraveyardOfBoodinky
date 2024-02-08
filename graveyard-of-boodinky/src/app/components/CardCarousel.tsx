import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import useMeasure from 'react-use-measure';
import Card from './Card'; // Make sure this path matches your file structure
type ItemType = {
  id: number;
  htmlCode: string;
  thumbnailUrl: string;
  videoUrl: string; // Add this line
  category: string;
  title: string;
  description: string;
};


const CARD_WIDTH = 350;
const CARD_HEIGHT = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const CardCarousel: React.FC = () => {
  const [ref, bounds] = useMeasure();
  const [videos, setVideos] = useState<ItemType[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchVideos = async () => {
      const videoUrls = [
        "https://www.tiktok.com/@boodinkyboys/video/7332349869400755502",
        "https://www.tiktok.com/@boodinkyboys/video/7332271001146838315",
        "https://www.tiktok.com/@boodinkyboys/video/7331804048712289582",
        "https://www.tiktok.com/@boodinkyboys/video/7331596556237327659",
        "https://www.tiktok.com/@boodinkyboys/video/7331101812931448107"
      ];
    
      try {
        const videoData = await Promise.all(videoUrls.map(async (url, index) => {
          const response = await axios.get(`https://www.tiktok.com/oembed?url=${url}`);
          return {
            id: index,
            htmlCode: response.data.html,
            thumbnailUrl: response.data.thumbnail_url,
            videoUrl: url, // The original TikTok video URL
            category: 'TikTok Video',
            title: `Video ${index + 1}`,
            description: `TikTok video ${index + 1}`,
          };
        }));
    
        setVideos(videoData); // Update the state with the new video data
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  // Logic for determining if you can shift left/right in the carousel
  // ...

  return (
    <section className="bg-slate-300" ref={ref}>
      {/* Carousel UI */}
      <div className="relative overflow-hidden p-4">
        <motion.div animate={{ x: offset }} className="flex">
          {videos.map((video) => (
            <Card key={video.id} item={video} />
          ))}
        </motion.div>
        {/* Shift left/right buttons */}
        {/* ... */}
      </div>
    </section>
  );
};

export default CardCarousel;
