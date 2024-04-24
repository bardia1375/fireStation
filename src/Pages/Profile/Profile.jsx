import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import axios from "axios";
import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";
import { useDispatch, useSelector } from "react-redux";
import { getprofile } from "../../Actions/User/user";
import { Route, Switch, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import ChangePassword from "./ChangePassword";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #0b647c;
`;

function Profile() {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    Url,
    Email,
    NationalCode,
    EconomicCode,
    RegNumber,
    Status,
    StatusName,
    Industry,
    SubIndustry,
    Responsible,
    Province,
    City,
    Fax,
    Address,
    PostalCode,
    CanSendTicket,
  } = useSelector(state => state.auth);
  let [color, setColor] = useState("#0b647c");
  const dispatch = useDispatch();
  const { TokenInfo } = useSelector(state => state.auth);
  // useEffect(() => {
  //   dispatch(getprofile());
  // }, []);
  useEffect(() => {
    setProfile(TokenInfo);
  }, [TokenInfo]);

  let match = useRouteMatch();
  <Switch>
    <Route exact path={`${match.path}/changepass`}>
      <ChangePassword />
    </Route>
    ;
  </Switch>;
  {
    /* And in this case it is /product/:id */
  }
 console.log("TokenIn234234fo",TokenInfo);
  return loading ? (
    <div className="profile">
      <div className="profile_header">
        <h2>اطلاعات تماس:</h2>
      </div>
      <div className="profile_collab">
        <div className="profile-item profile-seperate">
          <div className="row-one">
            <div className="profile-item-into profile-website">
              <h3>وب سایت</h3>
              <h2>{TokenInfo?.Url}</h2>
            </div>
          </div>
          <div className="row-one">
            <div className="profile-item-into profile-email">
              <h3>ایمیل</h3>
              <h2>{TokenInfo?.Email}</h2>
            </div>
          </div>
        </div>
        <div className="profile-item">
          <div className="row-one">
            <div className="profile-item-into">
              <h3>صنعت</h3>
              <h2>{TokenInfo?.Industry}</h2>
            </div>
          </div>
          <div className="row-one">
            <div className="profile-item-into">
              <h3>زیرصنعت</h3>
              <h2>{TokenInfo?.SubIndustry}</h2>
            </div>
          </div>
        </div>
        <div className="profile-item">
          <div className="row-one">
            {TokenInfo?.Status === null ? (
              <div className="profile-item-into-inComplete">
                <h3>شناسه حساب</h3>

                <h2 className="profile_inComplete"></h2>
              </div>
            ) : (
              <div className="profile-item-into">
                <h3>شناسه حساب</h3>
                <h2 className="font-digit">{TokenInfo?.Status}</h2>
              </div>
            )}
          </div>
          <div className="row-one">
            {EconomicCode === null ? (
              <div className="profile-item-into-inComplete">
                <h3>کداقتصادی</h3>

                <h2 className="profile_inComplete font-digit"></h2>
              </div>
            ) : (
              <div className="profile-item-into">
                <h3>کداقتصادی</h3>
                <h2 className="font-digit">{TokenInfo?.EconomicCode}</h2>
              </div>
            )}
          </div>
        </div>
        <div className="profile-item">
          <div className="row-one">
            {RegNumber === null ? (
              <div className="profile-item-into-inComplete">
                <h3>شماره ثبت</h3>

                <h2 className="profile_inComplete"></h2>
              </div>
            ) : (
              <div className="profile-item-into">
                <h3>شماره ثبت</h3>
                <h2 className="font-digit">{TokenInfo?.RegNumber}</h2>
              </div>
            )}
          </div>
          <div className="row-one">
            {NationalCode === null ? (
              <div className="profile-item-into-inComplete">
                <h3>شماره ملی</h3>

                <h2 className="profile_inComplete"></h2>
              </div>
            ) : (
              <div className="profile-item-into">
                <h3>شماره ملی</h3>
                <h2 className="font-digit">{TokenInfo?.NationalCode}</h2>
              </div>
            )}
          </div>
        </div>
        <div className="profile-item">
          <div className="row-one">
            <div className="profile-item-into">
              <h3>نمابر</h3>
              <h2 className="font-digit">{TokenInfo?.Fax}</h2>
            </div>
          </div>
          <div className="row-one">
            <div className="profile-item-into">
              <h3>وضعیت حساب</h3>
              <h2>{TokenInfo?.StatusName}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="profile_header-two">
        <h2>اطلاعات نشانی:</h2>
      </div>
      <div className="profile_collab">
        <div className="profile-item">
          <div className="row-one">
            <div className="profile-item-into">
              <h3>شهر</h3>
              <h2>{TokenInfo?.City}</h2>
            </div>
          </div>
          <div className="row-one">
            <div className="profile-item-into">
              <h3>کدپستی</h3>
              <h2 className="font-digit">{TokenInfo?.PostalCode}</h2>
            </div>
          </div>
        </div>
        <div className="profile-item">
          <div className="row-one">
            <div className="profile-item-into profile-last-item">
              <h3>نشانی</h3>
              <h2 className="font-digit">{TokenInfo?.Address}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="profile_footer">
        <div>
          <Link to="/profile/changepass" className="profile_pass">
            تغییر رمز عبور
          </Link>
          <Link className="profile_complete">تکمیل اطلاعات</Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="GlobalStyle_loading">
      <div className="GlobalStyle-loading-into">
        <h1>صفحه در حال بارگذاری است</h1>
        <MoonLoader color={color} loading={loading} css={override} size={60} />
      </div>
    </div>
  );
}

export default Profile;
