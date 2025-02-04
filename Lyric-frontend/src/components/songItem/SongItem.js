import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { MdPlaylistAdd } from "react-icons/md";
import { MdPlaylistAddCheck } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config";
//import Player from "../Player/Player";

const SongItem = ({ song }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    handleAddToPlaylist();
    setClicked(false);
  };

  // const handlePlay = (song) => {
  //   console.log(song);
  //   // console.log(`${config.lyric}/${song.song}`);
  //   navigate("/player", {
  //     state: { songUrl: `${config.lyric}/${song.song}` },
  //   });
  // };

  const handlePlay = (song) => {
    const songUrl = song.song ? `${config.lyric}/${song.song}` : undefined;

    if (!songUrl) {
      console.error("Song URL is undefined!");
      return;
    }

    console.log(songUrl);

    navigate("/player", {
      state: song, // Pass the constructed URL to the Player component
    });
  };

  useEffect(() => {
    fetchSammaPlaylist();
  }, []);

  const handleLikeToggle = async () => {
    try {
      const authToken = localStorage.getItem("userAuthToken");
      if (!authToken) {
        console.error("User not authenticated");
        return;
      }

      const configx = {
        headers: {
          "x-auth-token": authToken,
        },
      };

      const response = await axios.put(
        `${config.lyric}/api/songs/like/${song._id}`,
        null,
        configx
      );
      if (response.status === 200) {
        setIsLiked(!isLiked);
        console.log("Song liked:", response.data);
      } else {
        console.error("Failed to like song:", response.data.message);
      }
    } catch (error) {
      console.error("Error liking song:", error);
    }
  };

  const fetchSammaPlaylist = async () => {
    try {
      const response = await axios.get(
        `${config.lyric}/api/playlists/user-playlists`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("userAuthToken"),
          },
        }
      );
      if (response.status === 200) {
        const sammaPlaylists = response.data.data.map((playlist) => ({
          id: playlist._id,
          name: playlist.name,
          images: playlist.img ? [{ url: playlist.img }] : [],
          tracks: { total: playlist.songs.length },
        }));
        setPlaylists(sammaPlaylists);
      } else {
        setError("Failed to fetch user playlists.");
        setPlaylists([]);
      }
    } catch (error) {
      setError("Error fetching user playlists: " + error.message);
      setPlaylists([]);
    }
  };

  const handleAddToPlaylist = async () => {
    try {
      const authToken = localStorage.getItem("userAuthToken");
      if (!authToken || !selectedPlaylist) {
        console.error("User not authenticated or playlist not selected");
        return;
      }

      const configy = {
        headers: {
          "x-auth-token": authToken,
        },
      };

      const response = await axios.put(
        `${config.lyric}/api/playlists/add-song`,
        {
          playlistId: selectedPlaylist,
          songId: song._id,
        },
        configy
      );
      if (response.status === 200) {
        // Update UI to show the song is added to playlist
        console.log("Song added to playlist:", response.data);
      } else {
        console.error("Failed to add song to playlist:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding song to playlist:", error);
    }
  };

  return (
    <div className="song-item">
      <table>
        <tbody>
          <tr>
            <td>
              <img
                src={`${config.backend}/${song.img}`}
                alt="Album Art"
                className="song-img"
              />
              {console.log(song)}
            </td>
            <td>
              <p className="song-name">{song.name}</p>
              <p className="artist">{song.artist}</p>
            </td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <td className="control-icons">
              <FaPlay size={20} color="cyan" onClick={() => handlePlay(song)} />{" "}
              {/* this is Play Icon */} &nbsp;&nbsp;
              {isLiked ? (
                <CiHeart size={20} color="cyan" onClick={handleLikeToggle} />
              ) : (
                <FaHeart size={22} color="cyan" onClick={handleLikeToggle} />
              )}{" "}
              &nbsp;&nbsp; {/* Like Icon */}
              <div className="dropdown">
                <MdPlaylistAdd
                  color="cyan"
                  size={30}
                  onClick={fetchSammaPlaylist}
                />
                &nbsp;&nbsp;
                {playlists.length > 0 && (
                  <div className="dropdown-content">
                    {playlists.map((playlist) => (
                      <p
                        key={playlist.id}
                        onClick={() => {
                          setSelectedPlaylist(playlist.id);
                        }}
                      >
                        {playlist.name}
                        {selectedPlaylist === playlist.id && (
                          <MdPlaylistAddCheck
                            color="cyan"
                            onClick={handleClick}
                            size={30}
                          />
                        )}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SongItem;
