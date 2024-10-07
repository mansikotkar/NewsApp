import React, { useEffect, useState } from "react";
import useFetch from "../APICALL/Api";
import SideDrawer from "./SideDrawer";
import { useNavigate, useParams } from "react-router-dom";
import Error from "./Error";
import axios from "axios";
const url = `https://inshortsapi.vercel.app/news?category=all`;
const categorysArray = [
  "India",
  "Business",
  "Politics",
  "Sports",
  "Technology",
  "Startup",
  "Entertainment",
  "Hatke",
  "International",
  "Automobile",
  "Science",
  "Travel",
  "Miscellaneous",
];
function Home() {
  let { id } = useParams();
  const { data, loading, error } = useFetch(
    id ? `https://inshortsapi.vercel.app/news?category=${id}` : url
  );

  let [titleHindiData, set_titleHindiData] = useState([]);
  const [contentHindiData, set_contentHindiData] = useState([]);
  const [categorysArrayData, set_categorysArrayData] = useState(categorysArray);
  const [allNewsHindi, set_allNewsHindi] = useState();
  let localStorage_language = localStorage.getItem("language");
  localStorage_language = JSON.parse(localStorage_language);

  let getTitleandcontentonmainData = [];
  let newsTitle=[]
  let newsContent=[];

  const AllHindiNews = () => {
    const final = titleHindiData.map((name, index) => ({
      title: name,
      content: contentHindiData[index],
    }));
    set_allNewsHindi(final);
  };

  const TranslateTitleOfNews=()=>{
    for ( let i = 0; i < 9; i++) { 
      getTitleandcontentonmainData=[]
      getTitleandcontentonmainData.push(data?.data[i].title.slice(0, 500))
      console.log("i am first");
      hindititle();   
    }
  }
 
  const TranslateContentOfNews=()=>{
    for ( let i = 0; i < 9; i++) { 
      getTitleandcontentonmainData=[]
      getTitleandcontentonmainData.push( data?.data[i].content.slice(0, 500))   
       hindiContaint();
      }
  }



  const hindititle = async () => {
    const queryString = getTitleandcontentonmainData.join("/n");    
    if (localStorage_language == "hi") {
      const response = await axios.get(
        "https://api.mymemory.translated.net/get",
        {
          params: {
            q: queryString, // Required parameter
            langpair: "hi|en",
          },
        }
      );
      const translations = response.data.responseData.translatedText.split("\n");
      const translationswithspace= translations[0].split("/");
      newsTitle.push(translationswithspace)
      set_titleHindiData([newsTitle.flat()]); // Return an array of translations
    } else {
      const response = await axios.get(
        "https://api.mymemory.translated.net/get",
        {
          params: {
            q: queryString, // Required parameter
            langpair: "en|hi",
          },
        }
      );

      const translations =
        response.data.responseData.translatedText.split("/");
      let translationswithspace = translations[0].split("/");
      newsTitle.push(translationswithspace)
      // console.log(".......................", newsTitle);
      set_titleHindiData([newsTitle.flat()]); // Return an array of translations
    }
  };

  
  const hindiContaint = async () => {
    const queryString = getTitleandcontentonmainData.join("/");
    
    if (localStorage_language == "hi") {
      const response = await axios.get(
        "https://api.mymemory.translated.net/get",
        {
          params: {
            q: queryString, // Required parameter
            langpair: "hi|en",
          },
        }
      );
      const translations = response.data.responseData.translatedText.split("/");
      let translationswithspace = translations[0].split("/");
      newsContent.push(translationswithspace)
      set_contentHindiData([newsContent.flat()]);
    } else {
      const response = await axios.get(
        "https://api.mymemory.translated.net/get",
        {
          params: {
            q: queryString, // Required parameter
            langpair: "en|hi",
          },
        }
      );

      const translations =
        response.data.responseData.translatedText.split("\n");
        let translationswithspace = translations[0].split("/");
        newsContent.push(translationswithspace)
      // console.log(".......................", newsContent);
      set_contentHindiData([newsContent.flat()]);
    }
  };
  

  console.log("titleHindiData", titleHindiData);
  console.log("contentHindiData", contentHindiData);
  // console.log("allNewsHindi",allNewsHindi);
  // useEffect(() => {
    //   AllHindiNews();
  //   console.log("allNewsHindi",allNewsHindi);
  // }, [categorysArrayData]);


  
  const Select_data_language = async (e) => {
 
    const queryString = categorysArrayData.join("\n");
    if (localStorage_language == "hi") {
      const response = await axios.get(
        "https://api.mymemory.translated.net/get",
        {
          params: {
            q: queryString, // Required parameter
            langpair: "hi|en",
          },
        }
      );
      const translations =
       response.data.responseData.translatedText.split("\n");
      set_categorysArrayData(translations); // Return an array of translations
      TranslateContentOfNews();
      TranslateTitleOfNews();
      AllHindiNews();
      window.localStorage.setItem("language", JSON.stringify(e.target.value));
    } else {
      const response = await axios.get(
        "https://api.mymemory.translated.net/get",
        {
          params: {
            q: queryString, // Required parameter
            langpair: "en|hi",
          },
        }
      );
      const translations =
        response.data.responseData.translatedText.split("\n");
      set_categorysArrayData(translations); // Return an array of translations
      TranslateContentOfNews();
      TranslateTitleOfNews();
      AllHindiNews();
      window.localStorage.setItem("language", JSON.stringify(e.target.value));
    }
  };

  useEffect(() => {
    window.localStorage.setItem("language", JSON.stringify("en"));
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <>
      {error ? (
        <Error error={error} />
      ) : (
        <SideDrawer
          data={data}
          loading={loading}
          categorysArrayData={categorysArrayData}
          categorysArray={categorysArray}
          Select_data_language={Select_data_language}
        />
      )}
    </>
  );
}

export default Home;
