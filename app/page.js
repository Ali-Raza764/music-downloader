"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [playing, setPlaying] = useState("");
  // const data = await fetch("https://saavn.me/modules?language=english") | [];
  // const response = await data.json();

  const searchSongs = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await fetch(
      `https://saavn.me/search/songs?query=${e.target.search.value}&page=1&limit=10`
    );
    const result = await data.json();
    console.log(result.data.results);
    setData(result.data.results);
    setLoading(false);
  };
  const playSong = (url) => {
    setPlaying(url);
  };

  return (
    <main>
      <form
        className="w-full bg-slate-50 flex items-center justify-center p-2 sticky top-0"
        onSubmit={searchSongs}
      >
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search songs"
          className="w-[60%] p-3 border-2 shadow-xl"
        />
        <button
          className="p-3 bg-gray-900 rounded-md text-white border-2"
          type="submit"
        >
          search
        </button>
      </form>

      <div className="w-full min-h-screen flex items-center justify-center text-3xl font-bold">{loading && "Loading..."}</div>
      <div className="w-full flex items-center justify-center flex-wrap gap-4 pb-14">
        {!loading &&
          data?.map((song) => {
            return (
              <div key={song.id} className="flex flex-col items-center justify-center w-[19rem] border-2 shadow-2xl p-3 mb-4">
                <Image
                  width={500}
                  height={500}
                  src={song.image[1].link}
                  className="w-full"
                  alt={song.name}
                />
                <h2 className="text-ml font-bold text-ellipsis line-clamp-2">
                  {song.name}
                </h2>
                <div className="flex items-center justify-between w-full">
                  <div
                    className="text-xl font-bold cursor-pointer"
                    onClick={() => playSong(song.downloadUrl[3].link)}
                  >
                    Play
                  </div>
                  <a
                    href={song.downloadUrl[3].link}
                    download={song.downloadUrl[3].link}
                    target="_blank"
                    className="text-indigo-600"
                  >
                    Download
                  </a>
                </div>
              </div>
            );
          })}
      </div>
      <div className="fixed bottom-0 bg-gray-600  w-full p-3 items-center flex justify-center">
        <audio src={playing} controls autoPlay={true}></audio>
      </div>
    </main>
  );
}
