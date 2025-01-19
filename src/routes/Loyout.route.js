import React, { useEffect, useState } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import GreatingCard from "../common/notfound";

import Categories from "../pages/Category/Categories";
import Createcategory from "../pages/Category/Createcategory";
import UserTable from "../pages/Table/UserTable";
import QuestionAireTable from "../pages/Table/QuestionAireTable";
import FQATable from "../pages/Table/FQATable";
import CategorylistTable from "../pages/Table/Categorylists";
import RightPenal from "../pages/rightPenal";
import SubCategories from "../pages/SubCategory/SubCategories";
import SubCategorylist from "../pages/Table/SubCategory";
import AllMLN from "../pages/Table/AllMLN";
import MlnPayouts from "../pages/Table/MLNpayouts";
import EarningPayouts from "../pages/Table/EarningPayouts";
import Announcement from "../pages/Announcement";
import StickyNoticeTable from "../pages/Table/announcement/StickyNoticeTable";
import PopupTable from "../pages/Table/announcement/PopupTable";
import BannerTable from "../pages/Table/announcement/BannerTable";
import AprovedBanner from "../pages/Table/BannerAproval/AprovedBanner";
import DisaprevedBanner from "../pages/Table/BannerAproval/DisaprevedBanner";
import DocMangement from "../pages/Table/DocumentManagement/DocMangement";
import PendingDocument from "../pages/Table/DocumentManagement/PendingDocument";
import ChangePassword from "../pages/ChangePassword";
import AllServiceSeekers from "../pages/Table/passwordChange/SS/AllServiceSeekers";
import AllServiceProvider from "../pages/Table/passwordChange/SP/AllServiceProvider";
import AllSubAdmins from "../pages/Table/passwordChange/SubAdmin/AllSubAdmins";
import TicketManagement from "../pages/Table/TicketManagement";
import MNRModule from "../pages/MNR";
import TipsManagement from "../pages/TipManagement";
import SPManagementTable from "../pages/Table/SpManagement/AllSpList";
import MerchantdiseTable from "../pages/Table/merchandiseTable/MerchantdiseTable";
import Marchantdise from "../pages/marchandiseStore";
import CancellationManagement from "../pages/cancellationManagement";
import CancellationManagementList from "../pages/Table/CancellationManagementTable";
import ReportManagement from "../pages/reportManagement";
import CustomAnalytics from "../pages/customAnalytics";
import SubAdminList from "../pages/Table/subAdmin/SubAdminList";
import SubcriptionManagement from "../pages/subcriptionManagement";
import EditSubscriptionPlan from "../pages/subcriptionManagement/EditPlan";
import RadiusManagement from "../pages/radiusManagement";
import RadiusManagementList from "../pages/Table/RadiusManagementList";
import CountryManagementTable from "../pages/Table/CountryManagementTable";
import SendTokenList from "../pages/Table/MNR/SendTokenList";
import EarnedTokens from "../pages/Table/MNR/EarnedTokens";
import KycManagement from "../pages/Table/MNR/KycManagement";
import PendingKyc from "../pages/Table/MNR/PenddingKyc";
import KycQuestionList from "../pages/Table/DocumentManagement/KycQuestionList";
import MoonerManagement from "../pages/About_us";
import CategoryKyc from "../pages/categoryKyc";
import CommonKyc from "../pages/Table/categoryKyc/CommonCategoryKyx";
import CategorySpecficDocs from "../pages/Table/categoryKyc/CategorySpecficDocs";
import DisputeManagement from "../pages/disputeManagement";
import CabRefundManagement from "../pages/cabRefund";
import RefundManagement from "../pages/disputeManagement/refund";
import PendingDisputes from "../pages/Table/disputeManagement/PendingDisputes";
import PendingCabDisputes from "../pages/Table/cabManagement/PendingDisputes";
import DisputeHistory from "../pages/Table/disputeManagement/History";
import AprovedDisputeList from "../pages/Table/disputeManagement/AprovedDispute";
import AprovedCabDisputeList from "../pages/Table/cabManagement/AprovedDispute";
import RejectedDisputes from "../pages/Table/disputeManagement/RejectedDisputes";
import KycAnswers from "../pages/Table/categoryKyc/KycAnswers";
import ViewEachBooking from "../pages/Table/ViewEachBooking";
import ApprovedDocs from "../pages/Table/categoryKyc/ApprovedDocs";
import DisapprovedDocs from "../pages/Table/categoryKyc/DisapprovedDocs";
import ViewEachEarning from "../pages/Table/ViewEachEarning";
import BannerList from "../pages/Table/BannerList";
import Reviews from "../pages/fromReportManagement/Reviews";
import RefundDetails from "../pages/fromReportManagement/RefundDetails";
import CategoryListing from "../pages/fromReportManagement/CategoryListing";
import Drivers from "../pages/drivers/Drivers";
import Hitches from "../pages/hitches/Hitches";
import DisapprovedDocuments from "../pages/Table/DocumentManagement/DisapprovedDocuments";
import ActiveUser from "../pages/Table/activeUser/ActiveUser";
import ActiveServiceObject from "../pages/Table/activeUser/ActiveServiceObject";
import ActiveCabObject from "../pages/Table/activeUser/ActiveCabObject";
import axios from "axios";
import { baseURL } from "../api";
const useStyles = makeStyles((mainTheme) => ({
  root: {
    display: "flex",
    marginLeft: mainTheme.spacing(3),
    [mainTheme.breakpoints.down("sm")]: {
      marginLeft: mainTheme.spacing(1),
    },
  },
  profileContainer: {
    [mainTheme.breakpoints.up("xl")]: {
      marginLeft: mainTheme.spacing(3),
    },
    [mainTheme.breakpoints.only("lg")]: {
      marginLeft: mainTheme.spacing(1.5),
    },
    [mainTheme.breakpoints.down("md")]: {
      display: "none",
    },
    marginRight: "0px",
    padding: "0px",
  },
  TopContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: mainTheme.spacing(5),
    minWidth: "100%",
  },
  header: {
    display: "flex",
    minWidth: "100%",
    width: "100%",
  },
}));

const LoyoutRoutes = () => {

  const [stats,setStats]=useState({active_orders:0,completed_orders:0,weekly_sign_ups:0,total_users:0,total_user_type_sp:0})

  const getStats = async () =>{
    const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },

  };
    const res = await axios.get(
      `${baseURL}ticket_management/order_status/`,
      config
    );

    
    if (res?.data?.status) {
      setStats({active_orders:res?.data?.data?.ongoing_booking,completed_orders:res?.data?.data?.service_provided,weekly_sign_ups:res?.data?.data?.weekly_sign_up
        ,total_users:res?.data?.data?.total_users
        ,total_user_type_sp:res?.data?.data?.total_user_type_sp
      })

      console.log(stats)
    }
  }
  const classes = useStyles();
  let { path } = useRouteMatch();

  useEffect(()=>{
    getStats()
  },[])
  return (
    <Switch>
      <Grid Container className={classes.root}>
        <Grid xs={12} sm={12} md={12} lg={8} xl={8}>
          <Grid Container spacing={2} className={classes.TopContent}>
            <Grid xs={12}>
              <GreatingCard />
            </Grid>
          </Grid>
          <Grid container className={classes.header}>
            <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
              <Route path={`${path}/categories`} component={Categories} />
              <Route
                path={`${path}/create_category`}
                component={Createcategory}
              />
              <Route
                path={`${path}/sub_category/:id`}
                component={SubCategories}
              />
              <Route
                exact
                path={`${path}/list_subcategory/:id`}
                component={SubCategorylist}
              />

              <Route path={`${path}/user_management`} component={UserTable} />
              <Route
                path={`${path}/questionaire`}
                component={QuestionAireTable}
              />
              <Route path={`${path}/fqa`} component={FQATable} />
              {/* <Route path={`${path}/banners`} component={BannerList} /> */}
              <Route path={`${path}/CLT/:id`} component={CategorylistTable} />
              <Route path={`${path}/mln`} component={MlnPayouts} />
              <Route path={`${path}/earning`} component={EarningPayouts} />

              <Route path={`${path}/announcemet`} component={Announcement} />
              <Route
                path={`${path}/sticky_notice`}
                component={StickyNoticeTable}
              />
              <Route path={`${path}/popup`} component={PopupTable} />
              <Route path={`${path}/banner`} component={BannerList} />
              <Route
                path={`${path}/aproved_banner`}
                component={AprovedBanner}
              />
              <Route
                path={`${path}/disaproved_banner`}
                component={DisaprevedBanner}
              />
              <Route
                path={`${path}/document_management`}
                component={DocMangement}
              />
              <Route
                path={`${path}/pending_document`}
                component={PendingDocument}
              />
              <Route
                path={`${path}/disaproved_document`}
                component={DisapprovedDocuments}
              />
              <Route
                path={`${path}/change_password`}
                component={ChangePassword}
              />
              <Route
                path={`${path}/all_service_seekers`}
                component={AllServiceSeekers}
              />
              <Route
                path={`${path}/all_service_provider`}
                component={AllServiceProvider}
              />
              <Route path={`${path}/all_sub_admins`} component={AllSubAdmins} />
              <Route
                path={`${path}/ticket_management`}
                component={TicketManagement}
              />
              <Route path={`${path}/mnr`} component={MNRModule} />
              <Route
                path={`${path}/tips_management`}
                component={TipsManagement}
              />
              <Route
                path={`${path}/sp_management`}
                component={SPManagementTable}
              />
              <Route path={`${path}/active_jobs`} component={ActiveUser}  />
              <Route path={`${path}/active_service/:id`} component={ActiveServiceObject} />
              <Route path={`${path}/active_cab/:id`} component={ActiveCabObject} />
              <Route
                path={`${path}/merchandise_store_management`}
                component={MerchantdiseTable}
              />
              <Route
                path={`${path}/merchandise_store`}
                component={Marchantdise}
              />
              <Route
                path={`${path}/cancellation_management`}
                component={CancellationManagement}
              />
              <Route
                path={`${path}/cancellation_management_list`}
                component={CancellationManagementList}
              />
              <Route
                path={`${path}/report_management`}
                component={ReportManagement}
              />
              <Route
                path={`${path}/custom_analytics`}
                component={CustomAnalytics}
              />
              <Route path={`${path}/sub_admins`} component={SubAdminList} />
              <Route
                path={`${path}/subscription_management`}
                component={SubcriptionManagement}
              />
              <Route
                path={`${path}/subscription_plan/:From`}
                component={EditSubscriptionPlan}
              />
              <Route
                path={`${path}/radius_management`}
                component={RadiusManagement}
              />
              <Route
                path={`${path}/radius_management_list`}
                component={RadiusManagementList}
              />
              <Route
                path={`${path}/country_management_list`}
                component={CountryManagementTable}
              />
              <Route
                path={`${path}/send_token_list`}
                component={SendTokenList}
              />
              <Route
                path={`${path}/earned_token_list`}
                component={EarnedTokens}
              />
              <Route
                path={`${path}/kyc_management`}
                component={KycManagement}
              />
              <Route path={`${path}/pendding_kyc`} component={PendingKyc} />
              <Route
                path={`${path}/kyc_question_list`}
                component={KycQuestionList}
              />
              <Route
                path={`${path}/mooner_management`}
                component={MoonerManagement}
              />
              <Route path={`${path}/category_kyc`} component={CategoryKyc} />
              <Route
                path={`${path}/common_category_kyc`}
                component={CommonKyc}
              />
              <Route
                path={`${path}/category_specfic_kyc`}
                component={CategorySpecficDocs}
              />
              <Route
                path={`${path}/approvedDocs_kyc`}
                component={ApprovedDocs}
              />
              <Route
                path={`${path}/disapprovedDocs_kyc`}
                component={DisapprovedDocs}
              />
              <Route
                path={`${path}/dispute_management`}
                component={DisputeManagement}
              />
              <Route
                path={`${path}/refund_management`}
                component={RefundManagement}
              />
              <Route
                path={`${path}/cab_refund_management`}
                component={CabRefundManagement}
              />
              <Route
                path={`${path}/pending_disputes`}
                component={PendingDisputes}
              />
              <Route
                path={`${path}/pending_cab_disputes`}
                component={PendingCabDisputes}
              />
              <Route
                path={`${path}/dispute_History/:id`}
                component={DisputeHistory}
              />
              <Route
                path={`${path}/aproved_disputes`}
                component={AprovedDisputeList}
              />
              <Route
                path={`${path}/aproved_cab_disputes`}
                component={AprovedCabDisputeList}
              />

              <Route path={`${path}/kyc_answers`} component={KycAnswers} />

              <Route path={`${path}/refund&reviews`} component={Reviews} />
              <Route
                path={`${path}/refund_details`}
                component={RefundDetails}
              />
              <Route
                path={`${path}/category_listing`}
                component={CategoryListing}
              />
              <Route path={`${path}/drivers`} component={Drivers} />
              <Route path={`${path}/hitches`} component={Hitches} />
            </Grid>
          </Grid>
        </Grid>
        <Grid lg={4} xl={4} className={classes.profileContainer}>
          <RightPenal  stats={stats}/>
        </Grid>
      </Grid>
    </Switch>
  );
};

export default LoyoutRoutes;
