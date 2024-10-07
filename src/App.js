import { useCallback, useMemo, useState,useEffect } from "react";
import "./App.css";
import Home from "./Component/Home";
import { Route, Router, Routes, useParams } from "react-router-dom";
import Error from "./Component/Error";

function App() {
  let {id}=useParams();
  const url=`https://inshortsapi.vercel.app/news?category=all`
  // const url1=`https://inshortsapi.vercel.app/news?category=${id}`

  
  return (
    <>
    <Routes>
      <Route path="/" element={<Home url={url}/>}/>
      <Route path="/:id" element={<Home />}/>
    </Routes>
    </>
  );
}

export default App;
