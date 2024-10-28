import { useState, useEffect } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import VideoIcon from "@mui/icons-material/VideoCall";
import ActivityIcon from "@mui/icons-material/Assignment";
import CloseIcon from "@mui/icons-material/Close";
import "./MainPage.css";

const MainPage = () => {
  const plantContent = [
    {
      title: "Introduction",
      description: "Plants are amazing living things that play a vital role in our world! They come in all shapes, sizes, and colors, from tiny flowers to towering trees. Plants grow almost everywhere— in gardens, forests, and even deserts! They provide us with fresh air by taking in carbon dioxide and releasing oxygen. Plus, they give us delicious fruits, vegetables, and nuts to eat. Plants are also homes for many animals and insects, making them essential for our planet’s ecosystem. Let’s dive into the wonderful world of plants and discover why they are so important!",
      image: "https://images.pexels.com/photos/5622506/pexels-photo-5622506.jpeg",
      videoUrl: "https://www.youtube.com/watch?v=BwYjVLMucX0",
     
    },
    {
      title: "Parts Of Plants",
      description: "Plants have several important parts that help them grow and survive! Roots anchor the plant in the soil and absorb water and nutrients. The stem supports the plant and transports these nutrients to the leaves, where sunlight is turned into food through photosynthesis. Flowers attract insects for pollination and can develop into fruits, which hold seeds for new plants. Each part plays a crucial role in the plant's life cycle, making them essential to our environment!",
      image: "https://i.pinimg.com/736x/72/c4/be/72c4be992add95f858c5c4f2d79d6381.jpg",
      videoUrl: "https://m.youtube.com/watch?v=TD60-3rqPXg",
      activity: "https://iameonline.com/books/class-1/bubbles-class-1-sem-2/exercise/EVS-3/ch1.html"
    },
    {
      title: "Herbs",
      description: "Herbs are special plants that add flavor and excitement to our food! They are often used in cooking, and many of them have amazing smells and colors. Some common herbs you might know are basil, parsley, mint, and oregano. Herbs can grow in gardens, pots, or even indoors on windowsills, Not only do herbs make our meals tastier, but they also have health benefits! For example, mint can help with digestion, and basil is packed with vitamins. Kids can easily grow their own herbs and watch them thrive, making it a fun project! Learning about herbs is a great way to explore nature and discover new flavors. So next time you eat a delicious dish, think about the herbs that made it special!",
      image: "https://cdn.shopify.com/s/files/1/0622/8508/6951/files/iStock-510948701_480x480.jpg?v=1661966438",
      videoUrl: "https://www.youtube.com/watch?v=1qvt_H61NB0",
      activity: "https://iameonline.com/books/class-1/bubbles-class-1-sem-2/exercise/EVS-3/matching.html"
    },
    {
      title: "Shrubs",
      description: "Shrubs are small to medium-sized plants with many branches. They often have colorful flowers and can provide shelter for birds and insects. Some popular shrubs include lilacs and hydrangeas. You might find shrubs lining pathways or growing in groups to create a lush look.",
      image: "https://timesofagriculture.in/wp-content/uploads/2024/01/Shrubs-Plants-in-India-1.jpg",
      videoUrl: "https://www.youtube.com/watch?v=pT8tTiQSAZ4",
      activity: "https://iameonline.com/books/class-1/bubbles-class-1-sem-2/exercise/EVS-3/ch.html"
    }, {
      title: "Creepers",
      description: "Creepers, also known as ground covers, are plants that spread along the ground. They have long stems that trail and often cover large areas. Creepers like ivy and clover are great for preventing soil erosion and creating a soft, green carpet in gardens. They can also help make spaces look more colorful and vibrant!",
      image: "https://slideplayer.com/slide/10540029/36/images/6/Creeper+Creeper+is+a+plant+that+grows%2C+typically+along+the+ground%2C+by+slowly+spreading+out.+Examples%3A+Watermelon%2C+Pumpkin..jpg",
      videoUrl: "https://www.youtube.com/watch?v=VY2l9AJ7_wg",
      activity: "https://iameonline.com/books/class-1/bubbles-class-1-sem-2/exercise/EVS-3/matching.html"
    }, {
      title: "Climbers",
      description: "Climbers are plants that love to grow upwards! They use other structures, like fences or walls, to climb high into the sky. Some climbers, like vines and morning glories, have beautiful flowers that can decorate our homes and gardens. They can provide shade and privacy, making outdoor spaces more enjoyable.",
      image: "https://www.first-learn.com/images/climbers.png",
      videoUrl: "https://www.youtube.com/watch?v=VY2l9AJ7_wg",
      activity: "https://iameonline.com/books/class-1/bubbles-class-1-sem-2/exercise/EVS-3/matching.html"   },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const totalPages = plantContent.length;
  const [speechInstance, setSpeechInstance] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalType, setModalType] = useState("");

  const handleNext = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const handlePrevious = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  const togglePlay = () => setIsPlaying((prev) => !prev);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(handleNext, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const speakContent = () => {
    if (speechInstance) {
      window.speechSynthesis.cancel();
      setSpeechInstance(null);
    } else {
      const utterance = new SpeechSynthesisUtterance(plantContent[currentPage].description);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
      setSpeechInstance(utterance);
    }
  };

  const openModal = (type) => {
    setModalContent(type === "video" ? plantContent[currentPage].videoUrl : plantContent[currentPage].activity);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
    setModalType("");
  };

  return (
    <div className="main-page">
      <div className={`content-container page-style-${currentPage}`}>
        <section className="description-section">
          <h2>{plantContent[currentPage].title}</h2>
          <p>{plantContent[currentPage].description}</p>
          <img src={plantContent[currentPage].image} alt={plantContent[currentPage].title} className="plant-image" />

          <div className="music-video-icons">
            <MusicNoteIcon onClick={speakContent} className="icon" />
            <VideoIcon onClick={() => openModal("video")} className="icon" />
            <ActivityIcon onClick={() => openModal("activity")} className="icon" />
          </div>
        </section>
      </div>

      <div className="navigation-icons">
        <ArrowBackIcon onClick={handlePrevious} className="nav-icon" />
        {isPlaying ? <PauseIcon onClick={togglePlay} className="nav-icon" /> : <PlayArrowIcon onClick={togglePlay} className="nav-icon" />}
        <ArrowForwardIcon onClick={handleNext} className="nav-icon" />
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <CloseIcon onClick={closeModal} className="close-icon" />
            {modalType === "video" ? (
              modalContent.includes("youtube.com") ? (
                <iframe
                  width="100%"
                  height="315"
                  src={modalContent.replace("watch?v=", "embed/")}
                  title="YouTube Video Player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video controls className="video">
                  <source src={modalContent} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )
            ) : (
              <iframe
                src={modalContent}
                width="100%"
                height="100%"
                title="Activity Page"
                frameBorder="0"
                className="activity-iframe"
              ></iframe>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
