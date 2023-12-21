import { useEffect } from "react";
const simulate = [
  {
    tag: "Electronics",
    avail: "In Stock",
    name: "Smartphone X",
    price: "69900.99",
    desc: "Experience the cutting-edge technology of Smartphone X. With a sleek design and powerful features, stay connected in style. Elevate your digital experience with Smartphone X!",
    img_url: "smartphone_x_image.jpg",
  },
  {
    tag: "Home Appliances",
    avail: "Limited Stock",
    name: "Smart Home Hub",
    price: "14900.95",
    desc: "Transform your home into a smart haven with the Smart Home Hub. Limited stock available for those looking to automate and enhance their living spaces. Immerse yourself in the convenience of a connected home!",
    img_url: "smart_home_hub_image.jpg",
  },
  {
    tag: "Fashion",
    avail: "Back Soon",
    name: "Designer Watch",
    price: "29900.99",
    desc: "Adorn your wrist with the elegance of the Designer Watch. Coming back soon for those who appreciate timeless style and precision. Elevate your fashion statement with this exquisite timepiece!",
    img_url: "designer_watch_image.jpg",
  },
  {
    tag: "Electronics",
    avail: "Available",
    name: "Wireless Noise-Canceling Headphones",
    price: "12900.99",
    desc: "Immerse yourself in premium audio quality with our Wireless Noise-Canceling Headphones. Available now for an unparalleled listening experience. Elevate your music and audio with these cutting-edge headphones!",
    img_url: "wireless_headphones_image.jpg",
  },
  {
    tag: "Home Appliances",
    avail: "New Arrival",
    name: "Robot Vacuum Cleaner",
    price: "19900.95",
    desc: "Experience the convenience of hands-free cleaning with our Robot Vacuum Cleaner. A new arrival designed for those who seek efficient and smart home maintenance. Immerse yourself in the future of cleaning!",
    img_url: "robot_vacuum_image.jpg",
  },
  {
    tag: "Fashion",
    avail: "In Stock",
    name: "Leather Laptop Bag",
    price: "7900.99",
    desc: "Carry your essentials in style with the Leather Laptop Bag. In stock for those who value both fashion and functionality. Elevate your professional look with this sophisticated laptop bag!",
    img_url: "leather_laptop_bag_image.jpg",
  },
  {
    tag: "Electronics",
    avail: "Back Soon",
    name: "4K Ultra HD Smart TV",
    price: "79900.99",
    desc: "Bring the cinematic experience to your living room with our 4K Ultra HD Smart TV. Coming back soon for those who desire immersive entertainment at home. Elevate your viewing experience with this state-of-the-art TV!",
    img_url: "4k_smart_tv_image.jpg",
  },
  {
    tag: "Home Appliances",
    avail: "In Stock",
    name: "Smart Refrigerator",
    price: "149900.95",
    desc: "Upgrade your kitchen with the Smart Refrigerator. In stock for those who value freshness, convenience, and smart technology. Immerse yourself in the future of refrigeration!",
    img_url: "smart_refrigerator_image.jpg",
  },
  {
    tag: "Fashion",
    avail: "Limited Stock",
    name: "Fitness Tracker Watch",
    price: "12900.50",
    desc: "Monitor your fitness journey with the Fitness Tracker Watch. Limited stock available for those committed to a healthier lifestyle. Elevate your fitness routine with this advanced tracker!",
    img_url: "fitness_tracker_watch_image.jpg",
  },
  {
    tag: "Electronics",
    avail: "New Arrival",
    name: "High-Performance Gaming Laptop",
    price: "169900.99",
    desc: "Dominate the gaming arena with our High-Performance Gaming Laptop. A new arrival designed for gamers who demand speed and graphics excellence. Immerse yourself in the world of gaming with this powerful laptop!",
    img_url: "gaming_laptop_image.jpg",
  },
  {
    tag: "Fashion",
    avail: "In Stock",
    name: "Stylish Sunglasses",
    price: "59000.95",
    desc: "Shield your eyes in style with our Stylish Sunglasses. In stock for those who seek both protection and fashion. Elevate your look with these trendy sunglasses!",
    img_url: "stylish_sunglasses_image.jpg",
  },
  {
    tag: "Home Appliances",
    avail: "Available",
    name: "Coffee Maker with Grinder",
    price: "89000.99",
    desc: "Start your day with the perfect cup of coffee using our Coffee Maker with Grinder. Available now for coffee enthusiasts who value freshness and flavor. Immerse yourself in the aroma of freshly ground coffee!",
    img_url: "coffee_maker_image.jpg",
  },
  {
    tag: "Books",
    avail: "In Stock",
    name: "Bestseller Novel Set",
    price: "49000.99",
    desc: "Dive into captivating stories with our Bestseller Novel Set. In stock for book lovers who crave exciting narratives. Elevate your reading experience with these gripping novels!",
    img_url: "bestseller_novel_set_image.jpg",
  },
  {
    tag: "Toys",
    avail: "New Arrival",
    name: "Interactive Learning Toy",
    price: "29000.99",
    desc: "Ignite your child's curiosity with our Interactive Learning Toy. A new arrival designed to make learning fun and engaging. Elevate your child's playtime with this educational toy!",
    img_url: "interactive_learning_toy_image.jpg",
  },
  {
    tag: "Sports",
    avail: "In Stock",
    name: "Professional Tennis Racket",
    price: "79000.95",
    desc: "Enhance your tennis game with our Professional Tennis Racket. In stock for sports enthusiasts who aim for precision and power. Elevate your performance on the court with this high-quality racket!",
    img_url: "professional_tennis_racket_image.jpg",
  },
  {
    tag: "Health",
    avail: "Back Soon",
    name: "Nutrient-Rich Superfood Blend",
    price: "39000.99",
    desc: "Boost your health with our Nutrient-Rich Superfood Blend. Coming back soon for those who prioritize wellness. Elevate your nutrition with this blend of essential nutrients!",
    img_url: "superfood_blend_image.jpg",
  },
  {
    tag: "Outdoor",
    avail: "Limited Stock",
    name: "Camping Gear Set",
    price: "179000.99",
    desc: "Enhance your outdoor adventures with our Camping Gear Set. Limited stock available for those who love exploring the great outdoors. Elevate your camping experience with this comprehensive gear set!",
    img_url: "camping_gear_set_image.jpg",
  },
  {
    tag: "Beauty",
    avail: "Available",
    name: "Luxury Skincare Set",
    price: "119000.99",
    desc: "Indulge in the ultimate pampering experience with our Luxury Skincare Set. Available now for those who desire radiant and rejuvenated skin. Elevate your skincare routine with this luxurious set!",
    img_url: "luxury_skincare_set_image.jpg",
  },
  {
    tag: "Pets",
    avail: "In Stock",
    name: "Interactive Pet Toy",
    price: "19000.99",
    desc: "Keep your furry friend entertained with our Interactive Pet Toy. In stock for pet owners who want to provide engaging playtime for their pets. Elevate your pet's happiness with this fun and interactive toy!",
    img_url: "interactive_pet_toy_image.jpg",
  },
  {
    tag: "Kitchen",
    avail: "Back Soon",
    name: "Professional Chef Knife",
    price: "69000.99",
    desc: "Elevate your culinary skills with our Professional Chef Knife. Coming back soon for those who appreciate precision and quality in the kitchen. Elevate your cooking experience with this high-performance knife!",
    img_url: "professional_chef_knife_image.jpg",
  },
  {
    tag: "Garden",
    avail: "Limited Stock",
    name: "Smart Plant Monitoring System",
    price: "49000.95",
    desc: "Take your gardening to the next level with our Smart Plant Monitoring System. Limited stock available for those who want to keep their plants thriving. Elevate your gardening experience with this intelligent monitoring system!",
    img_url: "smart_plant_monitoring_system_image.jpg",
  },
  {
    tag: "Fitness",
    avail: "New Arrival",
    name: "Resistance Band Set",
    price: "34000.99",
    desc: "Achieve your fitness goals with our Resistance Band Set. A new arrival designed for versatile and effective workouts. Elevate your fitness routine with these high-quality resistance bands!",
    img_url: "resistance_band_set_image.jpg",
  },
  {
    tag: "Electronics",
    avail: "Back Soon",
    name: "Portable Bluetooth Speaker",
    price: "49000.99",
    desc: "Enjoy music on the go with our Portable Bluetooth Speaker. Coming back soon for those who want to bring their favorite tunes wherever they go. Elevate your audio experience with this compact and powerful speaker!",
    img_url: "portable_bluetooth_speaker_image.jpg",
  },
  {
    tag: "Fashion",
    avail: "In Stock",
    name: "Classic Leather Jacket",
    price: "129000.95",
    desc: "Make a style statement with our Classic Leather Jacket. In stock for those who appreciate timeless fashion. Elevate your wardrobe with this versatile and iconic leather jacket!",
    img_url: "classic_leather_jacket_image.jpg",
  },
  {
    tag: "Home Appliances",
    avail: "Available",
    name: "Smart Coffee Machine",
    price: "119000.99",
    desc: "Start your day with the perfect cup of coffee using our Smart Coffee Machine. Available now for coffee enthusiasts who want a personalized brewing experience. Elevate your coffee ritual with this innovative coffee machine!",
    img_url: "smart_coffee_machine_image.jpg",
  },
  {
    tag: "Beauty",
    avail: "Limited Stock",
    name: "Makeup Brush Set",
    price: "39000.99",
    desc: "Achieve flawless makeup application with our Makeup Brush Set. Limited stock available for those who want professional-grade brushes. Elevate your beauty routine with this high-quality brush set!",
    img_url: "makeup_brush_set_image.jpg",
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

export const FetchFavorite = (setData) => {
  useEffect(() => {
    const storedData = localStorage.getItem("favorite");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      const fetchData = async () => {
        try {
          localStorage.setItem("favorite", JSON.stringify([]));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [setData]);
};

export const FetchCart = (setData) => {
  useEffect(() => {
    const storedData = localStorage.getItem("cart");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      const fetchData = async () => {
        try {
          localStorage.setItem("cart", JSON.stringify([]));
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
    const storedData = sessionStorage.getItem("display");
    if (storedData) {
      setData(shuffleArray(JSON.parse(storedData))[0]);
    } else {
      const fetchData = async () => {
        try {
          let Data = shuffleArray(simulate);
          setData(Data[0]);
          sessionStorage.setItem("display", JSON.stringify(Data));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [setData]);
};
export function compareObj(first, second) {
  const keysA = Object.keys(first);
  const keysB = Object.keys(second);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let key of keysA) {
    if (first[key] !== second[key]) {
      return false;
    }
  }

  return true;
}

export const FetchAll = () => {
  // FetchArrivals();
  // FetchBest();
  // FetchDisplayData();
  // FetchFavorite();
  // FetchFeatured();
};

// export function Scan(data) {
//   const featured = JSON.parse(localStorage.getItem("featured")) || false;
//   const best = JSON.parse(localStorage.getItem("best")) || false;
//   const arrivals = JSON.parse(localStorage.getItem("arrival")) || false;
//   const favourites = JSON.parse(localStorage.getItem("favorites")) || undefined;
//   const display = JSON.parse(sessionStorage.getItem("display")) || false;
//   let storage = [featured, best, arrivals, favourites, display];
//   let storageString = ["featured", "best", "arrivals", "favourites", "display"];

//   console.log(storage);
//   if (featured && best && arrivals && favourites && display) {
//     for (let i = 0; i <= 5; i++) {
//       storage[i] !== undefined &&
//         storage[i].map((x, index) => {
//           if (compareObj(x, data)) {
//             const prev = storage[i][index];
//             prev.favorite = !prev.favorite;
//             if (storageString[i] === "display") {
//               sessionStorage.setItem(storageString[i].toString(), JSON.stringify([prev]));
//             } else {
//               localStorage.setItem(storageString[i].toString(), JSON.stringify([prev]));
//             }
//           }
//         });
//     }
//   }

//   // for()
// }
