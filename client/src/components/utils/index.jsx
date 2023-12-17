import { useEffect } from "react";

export const simulate = [
  {
    tag: "Skincare",
    avail: "In Stock",
    name: "GlowMaster Facial Serum",
    price: "$24.99",
    desc: "Embark on a journey to discover luminous and rejuvenated skin with our GlowMaster Facial Serum. Carefully crafted with a potent blend of nourishing ingredients, this serum goes beyond the surface, revitalizing and restoring your skin's natural radiance. Immerse yourself in the luxurious experience and elevate your skincare routine with GlowMaster!",
    img_url: "glowmaster_image1.jpg",
  },
  {
    tag: "Cosmetics",
    avail: "Limited Edition",
    name: "LuxeLash Volume Mascara",
    price: "$18.95",
    desc: "Indulge in the enchantment of LuxeLash Volume Mascara, a true masterpiece in lash transformation. This specially formulated mascara not only adds captivating volume and length but also defines each lash for a bold and beautiful look. Immerse yourself in the allure of LuxeLash and elevate your gaze!",
    img_url: "luxelash_image2.jpg",
  },
  {
    tag: "Haircare",
    avail: "Back Soon",
    name: "SilkSmooth Hair Serum",
    price: "$29.99",
    desc: "Transform your hair into a luscious and smooth masterpiece with SilkSmooth Hair Serum. Infused with the goodness of silk proteins, this serum not only tames frizz but also adds brilliant shine, leaving your hair irresistibly smooth. Embrace the luxurious feel of silky, smooth hair and elevate your haircare routine with SilkSmooth!",
    img_url: "silksmooth_image3.jpg",
  },
  {
    tag: "Fragrance",
    avail: "Available Now",
    name: "Ethereal Essence Perfume",
    price: "$39.95",
    desc: "Immerse yourself in the captivating aroma of Ethereal Essence Perfume. Available now for those who appreciate a fragrance that transcends the ordinary. Indulge in this long-lasting olfactory journey and elevate your senses with the ethereal allure of this exquisite perfume!",
    img_url: "etherealessence_image4.jpg",
  },
  {
    tag: "Skincare",
    avail: "In Stock",
    name: "Youthful Radiance Cream",
    price: "$34.99",
    desc: "Restore and revitalize your skin's youthful radiance with our carefully crafted Youthful Radiance Cream. In stock now for those who seek glowing skin that defies time. Immerse yourself in the luxurious feel of this cream and elevate your skincare routine to new heights!",
    img_url: "youthfulradiance_image5.jpg",
  },
  {
    tag: "Cosmetics",
    avail: "New Arrival",
    name: "ColorPop Lipstick Set",
    price: "$27.99",
    desc: "Experience a burst of vibrant colors with the ColorPop Lipstick Set. A new arrival designed for those who crave trendy and expressive looks. Immerse yourself in the world of vibrant hues and elevate your makeup game with the ColorPop set!",
    img_url: "colorpop_image6.jpg",
  },
  {
    tag: "Haircare",
    avail: "Back Soon",
    name: "CurlDefine Styling Gel",
    price: "$14.95",
    desc: "Define and showcase your curls with the CurlDefine Styling Gel. Coming back soon for those who desire flawless curls that make a statement. Immerse yourself in the luxurious hold and definition, and elevate your curl game with CurlDefine!",
    img_url: "curldefine_image7.jpg",
  },
  {
    tag: "Fragrance",
    avail: "Limited Stock",
    name: "Mystic Woods Cologne",
    price: "$45.99",
    desc: "Embark on a sensory journey with the captivating scent of Mystic Woods Cologne. Limited stock available for those who appreciate a uniquely enchanting fragrance. Immerse yourself in the mystical aroma and elevate your fragrance collection with Mystic Woods!",
    img_url: "mysticwoods_image8.jpg",
  },
  {
    tag: "Skincare",
    avail: "In Stock",
    name: "HydraFresh Moisturizer",
    price: "$27.95",
    desc: "Quench your skin's thirst with HydraFresh Moisturizer, available in stock for a refreshing and revitalizing skincare routine. Immerse yourself in the luxurious hydration and elevate your skincare routine with HydraFresh!",
    img_url: "hydrafresh_image9.jpg",
  },
  {
    tag: "Cosmetics",
    avail: "New Arrival",
    name: "GlamourGlow Highlighter Palette",
    price: "$32.50",
    desc: "Illuminate your features with the GlamourGlow Highlighter Palette, a new arrival for a glamorous glow that radiates sophistication. Immerse yourself in the luxurious shine and elevate your makeup routine with GlamourGlow!",
    img_url: "glamourglow_image10.jpg",
  },
];

export function shuffleArray(array) {
  const shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

export const FetchArrivals = (setData) => {
  useEffect(() => {
    const storedData = localStorage.getItem("arrivals");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      const fetchData = async () => {
        try {
          setData(simulate);
          localStorage.setItem("arrival", JSON.stringify(simulate));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [setData]);
};

export const FetchBest = (setData) => {
  useEffect(() => {
    const storedData = localStorage.getItem("best");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      const fetchData = async () => {
        try {
          let Data = shuffleArray(simulate);
          setData(Data);
          localStorage.setItem("best", JSON.stringify(Data));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [setData]);
};

export const FetchFeatured = (setData) => {
  useEffect(() => {
    const storedData = localStorage.getItem("featured");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      const fetchData = async () => {
        try {
          let Data = shuffleArray(simulate);
          setData(Data);
          localStorage.setItem("featured", JSON.stringify(Data));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [setData]);
};

export const FetchDisplayData = (setData) => {
  useEffect(() => {
    const storedData = localStorage.getItem("display");
    if (storedData) {
      setData(shuffleArray(JSON.parse(storedData))[0]);
    } else {
      const fetchData = async () => {
        try {
          let Data = shuffleArray(simulate);
          setData(Data[0]);
          localStorage.setItem("display", JSON.stringify(Data));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [setData]);
};
