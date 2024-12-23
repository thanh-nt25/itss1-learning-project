import React from "react";
import { MdDashboard } from "react-icons/md";
import "./account.css";
import { IoMdLogOut } from "react-icons/io";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = ({ user }) => {
  // const { setIsAuth, setUser } = UserData();

  // const navigate = useNavigate();

  // const logoutHandler = () => {
  //   localStorage.clear();
  //   setUser([]);
  //   setIsAuth(false);
  //   toast.success("Logged Out");
  //   navigate("/login");
  // };
  return (
    <div>
    
    <body>
    <div class=" w-full items-center justify-center h-screen flex mb-36 mt-20">
        <div class="w-1/4 mr-4 mt-30">
            <div class="course">
                <label>
                    コース
                </label>
                <progress max="100" value="70"> </progress>
            </div>
            <div class="course">
                <label>
                    コース
                </label>
                <progress max="100" value="50"> </progress>
            </div>
            <div class="course">
                <label>
                    コース
                </label>
                <progress max="100" value="30"> </progress>
            </div>
            <div class="course">
                <label>
                    コース
                </label>
                <progress max="100" value="90"> </progress>
            </div>
            <div class="more">
                <button>
                    ▼
                </button>
            </div>
        </div>
        <div class="grid grid-cols-2 w-3/5 gap-8 ">
          <div>
           <div class="profile-pic">
                <img alt="Profile picture placeholder" height="100" src="https://storage.googleapis.com/a1aa/image/emaVyslPDRx4dqmHhk6ss5vWyuQnjFujihgKiNwmyPiS9yeTA.jpg" width="100" />
            </div>
            <div class="form-group">
                <label>
                    Eメール
                </label>
                <input type="email" />
            </div>
            <div class="form-group">
                <label>
                    電話番号
                </label>
                <input type="tel" />
            </div>
            <div class="form-group">
                <label>
                    職業
                </label>
                <input type="text" />
            </div>
          </div>
          <div>
          <div class="update-button absolute apply">
                            <p class="items-center justify-center">
                                更新
                            </p>
                        </div>
                    <div class="form-group">
                        
                        <label>
                            名前
                        </label>
                        <span class="form-control">Nguyễn Văn A</span>
                        
                    </div>
                    <div class="flex my-6-custom">
                      <span >
                        <label>
                            年
                        </label>
                        <select>
                            <option>
                                2023
                            </option>
                            <option>
                                2022
                            </option>
                            <option>
                                2021
                            </option>
                        </select>
                    </span>
                    <div class="">
                        <label>
                            月
                        </label>
                        <select>
                            <option>
                                1
                            </option>
                            <option>
                                2
                            </option>
                            <option>
                                3
                            </option>
                        </select>
                    </div>
                    <div class="">
                        <label>
                            日
                        </label>
                        <select>
                            <option>
                                1
                            </option>
                            <option>
                                2
                            </option>
                            <option>
                                3
                            </option>
                        </select>
                    </div>
                    </div>
                    <div class="form-group">
                        <label>
                            性別
                        </label>
                        <input type="text" />
                    </div>
                    <div class="form-group">
                        <label>
                            住所
                        </label>
                        <input type="text" />
                    </div>
                    <div class="form-group">
                        <label>
                            登録日
                        </label>
                        <input type="text" />
                    </div>
          </div>

        </div>
    </div>
   
</body>

  </div>

  );
};

export default Account;
