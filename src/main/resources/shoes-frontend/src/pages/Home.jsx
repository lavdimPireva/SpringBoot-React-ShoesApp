import { Box } from "@material-ui/core";
import WelcomeDescription from "../components/WelcomeDescription";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ShoeList from "../components/ShoeList.jsx";

import shoeImageZxBardh from "../images/zx_bardh.jpg";
import shoeImageZxZeza from "../images/zx_zeza.jpg";
import shoeImageZxTeget from "../images/zx_teget.jpg";
import shoeImageZxHiri from "../images/zx_hiri.jpg";

import shoeImageReebokBardh from "../images/reebok_bardh.jpg";
import shoeImageReebokZeza from "../images/reebok_zeza.jpg";
import shoeImageNewDragonZeza from "../images/newdragon_zeza.jpg";
import shoeImageNewDragonGjelbert from "../images/newdragon_gjelbert.jpg";
import shoeImageNewDragonKrem from "../images/newdragon_krem.jpg";
import shoeImageNewDragonBardh from "../images/newdragon_bardh.jpg";
import shoeImageDragonZeza from "../images/dragon_zeza.jpg";
import shoeImageDragonGjelbert from "../images/dragon_gjelbert.jpg";

import shoeImageAlexanderBardh from "../images/alexander_bardh.jpg";
import shoeImageAlexanderBardheZi from "../images/alexander_bardhezi.jpg";
import shoeImageAlexanderZeze from "../images/alexander_zeze.jpg";
import shoeImageAlexanderZiBardh from "../images/alexander_zibardh.jpg";

const Home = () => {
  const shoes = [
    {
      image: shoeImageZxBardh,
      name: "ZX BARDH",
      description:
        "The Nike Air Zoom Pegasus 38 is a versatile running shoe with a responsive Zoom Air unit and a secure, comfortable fit.",
      price: 20,
      discountPrice: 69,
    },
    {
      image: shoeImageZxZeza,
      name: "ZX ZEZA",
      description:
        "The Adidas Ultraboost 21 is a premium running shoe with a responsive Boost midsole and a breathable, adaptive fit.",
      price: 20,
      discountPrice: 69,
    },
    {
      image: shoeImageZxHiri,
      name: "ZX HIRI",
      description:
        "The Adidas Ultraboost 21 is a premium running shoe with a responsive Boost midsole and a breathable, adaptive fit.",
      price: 20,
      discountPrice: 69,
    },
    {
      image: shoeImageZxTeget,
      name: "ZX TEGET",
      description:
        "The Adidas Ultraboost 21 is a premium running shoe with a responsive Boost midsole and a breathable, adaptive fit.",
      price: 20,
      discountPrice: 69,
    },
    {
      image: shoeImageReebokBardh,
      name: "Reebok e Bardh",
      description:
        "The Adidas Ultraboost 21 is a premium running shoe with a responsive Boost midsole and a breathable, adaptive fit.",
      price: 20,
      discountPrice: 69,
    },
    {
      image: shoeImageReebokZeza,
      name: "Reebok e Zeze",
      description:
        "The Adidas Ultraboost 21 is a premium running shoe with a responsive Boost midsole and a breathable, adaptive fit.",
      price: 20,
      discountPrice: 69,
    },
    {
      image: shoeImageNewDragonZeza,
      name: "New Dragon Zeza",
      description:
        "The Adidas Ultraboost 21 is a premium running shoe with a responsive Boost midsole and a breathable, adaptive fit.",
      price: 20,
      discountPrice: 69,
    },
    {
      image: shoeImageNewDragonGjelbert,
      name: "New Dragon Gjelbert",
      description:
        "The Adidas Ultraboost 21 is a premium running shoe with a responsive Boost midsole and a breathable, adaptive fit.",
      price: 20,
      discountPrice: 69,
    },
    {
      image: shoeImageNewDragonKrem,
      name: "New Dragon Krem",
      description:
        "The Adidas Ultraboost 21 is a premium running shoe with a responsive Boost midsole and a breathable, adaptive fit.",
      price: 20,
      discountPrice: 69,
    },
    {
      image: shoeImageNewDragonBardh,
      name: "New Dragon Bardh",
      description:
        "The Adidas Ultraboost 21 is a premium running shoe with a responsive Boost midsole and a breathable, adaptive fit.",
      price: 20,
      discountPrice: 69,
    },
    {
      image: shoeImageDragonZeza,
      name: "Dragon e Zeze",
      description:
        "The Adidas Ultraboost 21 is a premium running shoe with a responsive Boost midsole and a breathable, adaptive fit.",
      price: 20,
      discountPrice: 69,
    },
    {
      image: shoeImageDragonGjelbert,
      name: "Dragon e Gjelbert",
      description:
        "The Adidas Ultraboost 21 is a premium running shoe with a responsive Boost midsole and a breathable, adaptive fit.",
      price: 20,
      discountPrice: 69,
    },
    {
      image: shoeImageAlexanderBardh,
      name: "Alexander Mcqueen e Bardh",
      description:
        "The Adidas Ultraboost 21 is a premium running shoe with a responsive Boost midsole and a breathable, adaptive fit.",
      price: 20,
      discountPrice: 79,
    },
    {
      image: shoeImageAlexanderBardheZi,
      name: "Alexander Mcqueen Bardh e Zi",
      description:
        "The Adidas Ultraboost 21 is a premium running shoe with a responsive Boost midsole and a breathable, adaptive fit.",
      price: 20,
      discountPrice: 79,
    },
    {
      image: shoeImageAlexanderZeze,
      name: "Alexander Mcqueen Zeze",
      description:
        "The Adidas Ultraboost 21 is a premium running shoe with a responsive Boost midsole and a breathable, adaptive fit.",
      price: 20,
      discountPrice: 79,
    },
    {
      image: shoeImageAlexanderZiBardh,
      name: "Alexander Mcqueen Zi Bardh",
      description:
        "The Adidas Ultraboost 21 is a premium running shoe with a responsive Boost midsole and a breathable, adaptive fit.",
      price: 20,
      discountPrice: 79,
    },
    // ...
  ];

  return (
    <>
      <Navbar />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box m={2}>
          <WelcomeDescription />
        </Box>
      </Box>
      <ShoeList shoes={shoes} />
      <Footer />
    </>
  );
};

export default Home;
