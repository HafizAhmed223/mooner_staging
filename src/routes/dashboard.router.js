import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";

import { Grid, makeStyles } from "@material-ui/core";

import UserDetails from "../pages/user/createUser";
import SideBar from "../common/SideBar";
import EditQuestionAire from "../pages/QuestionAire/EditQuestionAire";
import ViewQuestionaire from "../pages/QuestionAire/ViewQuestionaire";
import EditView from "../pages/user/EditView";
import AllTokenFiat from "../pages/Table/AllTokenFiat";
import AllBankDetails from "../pages/Table/AllBankDetails";
import AllPaymentHistory from "../pages/Table/AllPaymentHistory";
import AllAppointment from "../pages/Table/AllAppointment";
import AllBookings from "../pages/Table/AllBookings";
import ChangeStatus from "../pages/Bookings/ChangeStatus";
import AddQuestionaire from "../pages/QuestionAire/AddQuestionaire";
import RefundPayment from "../pages/Bookings/RefundPayment";
import CrowlBack from "../pages/Bookings/CrowlBack";
import ChangeAppoitmentStatus from "../pages/Appoitment/ChangeAppoitmentStatus";
import CreateNotification from "../pages/Notifications/CreateNotification";
import Addnewcategory from "../pages/Category/Addnewcategory";
import Addsubcategory from "../pages/SubCategory/Addsubcategory";
import EditSubCategory from "../pages/SubCategory/EditSubCategory";
import UPDATECATGEORY from "../pages/Category/UPDATECATGEORY";
import LayoutRoutes from "./Loyout.route";
import ViewReferral from "../pages/MLN/ViewReferrals";
import ViewMLNUser from "../pages/MLN/ViewMNLUser";
import EditMLNUser from "../pages/MLN/EditMLN";
import AddStickyNotice from "../pages/Announcement/stickeyNotice/CreateStickyNote";
import ViewStickeyNote from "../pages/Announcement/stickeyNotice/ViewStickyNote";
import EditStickyNote from "../pages/Announcement/stickeyNotice/EditStickyNote";
import CreatePopup from "../pages/Announcement/popup/CreatePopup";
import ViewPopup from "../pages/Announcement/popup/ViewPopup";
import EditPopup from "../pages/Announcement/popup/EditPopup";
import CreateBanner from "../pages/Announcement/banner/CreateBanner";
import ViewBanner from "../pages/Announcement/banner/ViewBanner";
import CreateFAQ from "../pages/FAQ/CreateFAQ";
import ViewFAQs from "../pages/FAQ/ViewFAQ";
import EditFAQs from "../pages/FAQ/EditFAQ";
import EditApprovedBanner from "../pages/Banners/ApprovedBanner/EditApprovedBanner";
import ViewApprovedBanner from "../pages/Banners/ApprovedBanner/ViewApprovedBanner";
import ViewDocument from "../pages/documentManagement/ApprovedDocuments/ViewDocument";
import EditDocument from "../pages/documentManagement/ApprovedDocuments/EditDocument";
import ViewPenddingDocument from "../pages/documentManagement/PenddingDocuments/ViewPendingDoc";
import EditPendingDoc from "../pages/documentManagement/PenddingDocuments/EditPendingDoc";
import EditDisapproveDoc from "../pages/documentManagement/PenddingDocuments/EditDisapproveDoc";
import DissaproveFeedBack from "../pages/documentManagement/PenddingDocuments/DisapproveFeedback";
import CreateTicket from "../pages/TicketManagement/CreateTicket";
import ViewTicket from "../pages/TicketManagement/ViewTicket";
import EditTicket from "../pages/TicketManagement/EditTicket";
import ViewtipsRecords from "../pages/TipManagement/ViewTipsRecords";
import ChangeSeviceSeekerStatus from "../pages/SPManagement/ChangeStatus";
import EditViewSpManagement from "../pages/SPManagement/EditViewSpManagement";
import AllEarnings from "../pages/Table/AllEarning";
import AllRatingReviews from "../pages/Table/RatingAndReviews/AllRatingReviews";
import EditServiceProvider from "../pages/SPManagement/EditServiceProvider";
import AllSpBookings from "../pages/Table/SpManagement/AllSpBookings";
import ResponsiveTopbar from "../common/responsiveTopbar/ResponsveTopbar";
import ChangePassword from "../pages/ChangePassword/ChangePass";
import AddItems from "../pages/marchandiseStore/items/AddItems";
import ViewCanclellationManagement from "../pages/cancellationManagement/ViewCM";
import RefundAndAllocate from "../pages/cancellationManagement/RefundAndAllocate";
import CreateSubAdmin from "../pages/subAdmin/CreateSubAdmin";
import addCountry from "../pages/countryManagement/addCountry";
import ChangeUserStatus from "../pages/user/ChangeStatus";
import MarginProfit from "../pages/MLN/MarginProfit";
import FeeMargin from "../pages/MLN/FeeMargin";
import TestQuestion from "../pages/QuestionAire/TestQuestion";
import AddKycQuestion from "../pages/documentManagement/kyc/AddKycQuestion";
import SpAllDocuments from "../pages/Table/SpManagement/SpAllDocuments";
import ViewRatting from "../pages/ratting_reviews/ViewRatting";
import EditRatting from "../pages/ratting_reviews/EditRatting";
import SetTokenRate from "../pages/MLN/TokenRate";
import AboutUs from "../pages/About_us/AboutUs";
import TermsAndConditions from "../pages/About_us/Term";
import PrivicyPolicy from "../pages/About_us/PrivicyPolicy";
import PostCommonDocs from "../pages/categoryKyc/commonKyc/ComonDocuments";
import ViewCommonKyc from "../pages/categoryKyc/commonKyc/ViewCommonKyc";
import EditCommonKyc from "../pages/categoryKyc/commonKyc/EditCommonKyc";
import AddSprcficKyc from "../pages/categoryKyc/CategorySpecficKyc/AddSprcficKyc";
import ViewSpecficKyc from "../pages/categoryKyc/CategorySpecficKyc/ViewSpecficKyc";
import EditPendingDisputes from "../pages/disputeManagement/refund/EditPendingDispute";
import EditPendingCabDisputes from "../pages/cabRefund/EditPendingDispute";
import EditAproveDispute from "../pages/disputeManagement/refund/EditAproveDispute";
import EditSpecficKyc from "../pages/categoryKyc/CategorySpecficKyc/EditSpecficKyc";
import EditKycAnswers from "../pages/categoryKyc/kycAnswers/ViewKycAnswer";
import { getAllNotification } from "./../redux/actions/notifications/notification.actions";
import ViewEachBooking from "../pages/Table/ViewEachBooking";
import ViewEachPayment from "../pages/Table/ViewEachPayment";
import ViewEachEarning from "../pages/Table/ViewEachEarning";
import ViewCompletedBooking from "../pages/Table/SpManagement/ViewCompletedBooking";
import SPServices from "../pages/Table/spServices/spService";
// import viewService from "../pages/Table/spServices/viewService";
import AddPermissions from "../pages/subAdmin/AddPermissions";
import RemovePermissions from "../pages/subAdmin/RemovePermissions";
import CreateRole from "../pages/subAdmin/CreateRole";
import AddBanner from "../pages/Banner/AddBanner";
import ViewBanners from "../pages/Banner/ViewBanners";
import EditBanner from "../pages/Banner/EditBanner";
import Drivers from "../pages/drivers/Drivers";
import PaidoutListing from "../pages/reportManagement/PaidoutListing";
import MlnListing from "../pages/reportManagement/MlnListing";
import BookingsListing from "../pages/reportManagement/BookingsListing";
import BookingTable from "../pages/customAnalytics/BookingTable";
import AllCabBooking from "../pages/Table/AllCabBooking";
import ViewEachCabBooking from "../pages/Table/ViewEachCabBooking";
import ViewEarningDetails from "../pages/Table/ViewEarningDetails";
import ServiceObject from "../pages/customAnalytics/ServiceObject";
import BookingObject from "../pages/customAnalytics/BookingObject";
import StripeObject from "../pages/customAnalytics/StripeObject";
import GasObject from "../pages/customAnalytics/GasObject";
import SSpentObject from "../pages/customAnalytics/SSpentObject";
import AmountPaid from "../pages/customAnalytics/AmountPaid";
import SpEarningMln from "../pages/customAnalytics/SpEarningMln";
import ActiveUser from "../pages/customAnalytics/ActiveUser";
import NonActiveUser from "../pages/customAnalytics/NonActiveUser";
import RetentionObject from "../pages/customAnalytics/RetentionObject";
import CancelBooking from "../pages/customAnalytics/CancelBooking";
import Ongoing from "../pages/customAnalytics/Ongoing";
import TServiceProvider from "../pages/customAnalytics/TServiceProvider";



const useStyles = makeStyles((mainTheme) => ({
  root: {
    flexGrow: 1,
    padding: mainTheme.spacing(0),
    margin: mainTheme.spacing(0),
    maxWidth: "100%",
    backgroundColor: "#20253B",
    borderRadius: "40px 0px 0px 0px",
  },
  sidebarContainer: {
    backgroundColor:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.primary &&
      mainTheme.palette.primary.main,
    borderRadius: "30px 0px 0px 10px",
    // position: "sticky",
    // top: 0,
    overflow: "hidden",
    maxWidth: "10.6%",
    height: "1200px",
    scrollbarColor: "transparent transparent",
    scrollbarWidth: "thin",
    [mainTheme.breakpoints.down("xl")]: {
      "@global": {
        "*::-webkit-scrollbar": {
          width: "0px",
          display: "none",
          "-ms-overflow-style": "none" /* IE 11 */,
          scrollbarWidth: "none",
        },
        "*::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.1)",
        },
      },
    },
    [mainTheme.breakpoints.down("md")]: {
      display: "none",
    },
  },

  mainGridContainer: {
    maxWidth: "100%",
    [mainTheme.breakpoints.down("md")]: {
      minHeight: "1400px",
    },
  },

  //////////////////////
  //  center content  //
  /////////////////////

  componentsContaineU: {
    margin: "0px",
    padding: "0px",
    maxWidth: "89.333333%",
    flexBasis: "100%",
    height: "auto",
    [mainTheme.breakpoints.only("xl")]: {
      maxWidth: "91.667333%",
    },
    [mainTheme.breakpoints.only("lg")]: {
      width: "100%",
    },
    [mainTheme.breakpoints.down("md")]: {
      maxWidth: "100%",
      width: "100%",
      backgroundColor: "#20253B",
    },
  },
  componentContent: {
    // position: "relative",
    backgroundColor: "#F0F3F8",
    borderRadius: "40px 0px 0px 40px",
    // right: "5px",
    overflow: "hidden",
    height: "100%",
    widht: "100%",
    [mainTheme.breakpoints.only("lg")]: {
      borderRadius: "20px 0px 0px 40px",
    },
    [mainTheme.breakpoints.down("md")]: {
      borderRadius: "40px 40px 0px 0px",
      minHeight: "100%",
    },
  },

  ////////////////////////////
  //   Right Penal Styling  //
  ///////////////////////////

  rightPenal: {
    padding: mainTheme.spacing(0),
  },
}));

const DashboardRoutes = ({ getAllNotification }) => {
  useEffect(() => {
    getAllNotification();
  }, []);

  let { path } = useRouteMatch();
  // console.log(path,"paths")
  const classes = useStyles();
  return (
    <Switch>
      <>
        <ResponsiveTopbar />
        <div className={classes.root}>
          <Grid container className={classes.mainGridContainer}>
            <Grid
              item
              xs={5}
              sm={3}
              md={3}
              lg={2}
              xl={1}
              className={classes.sidebarContainer}
            >
              <SideBar />
            </Grid>
            <Grid
              item
              xs={7}
              sm={9}
              md={9}
              lg={10}
              xl={11}
              className={classes.componentsContaineU}
            >
              <div className={classes.componentContent}>
                <Grid>
                  <Grid item xs={12}>
                    <Route
                      path={`${path}/edit_user/:id`}
                      component={UserDetails}
                    />
                    {/* route of add new category from create category */}
                    <Route
                      path={`${path}/addnew_category`}
                      component={Addnewcategory}
                    />
                    <Route
                      path={`${path}/addsub_category/:id`}
                      component={Addsubcategory}
                    />
                    <Route
                      path={`${path}/update_category/:id`}
                      component={UPDATECATGEORY}
                    />
                    <Route
                      path={`${path}/edit_SubCategory/:id`}
                      component={EditSubCategory}
                    />
                    {/* <Route
                      path={`${path}/user_management`}
                      component={UserTable}
                    /> */}
                    {/* <Route
                      path={`${path}/questionaire`}
                      component={QuestionAireTable}
                    /> */}
                    <Route
                      path={`${path}/edit_questionaire/:id`}
                      component={EditQuestionAire}
                    />
                    <Route
                      path={`${path}/add_questionaire`}
                      component={AddQuestionaire}
                    />
                    <Route
                      path={`${path}/view_questionaire/:id`}
                      component={ViewQuestionaire}
                    />
                    <Route
                      path={`${path}/user_detail/:id`}
                      component={EditView}
                    />
                    <Route
                      path={`${path}/update_service/:id`}
                      component={SPServices}
                    />
                    <Route
                      path={`${path}/token_&_fiat`}
                      component={AllTokenFiat}
                    />
                    <Route
                      path={`${path}/referrals/:id`}
                      component={ViewReferral}
                    />
                    <Route
                      path={`${path}/viewearning/:id`}
                      component={ViewEarningDetails}
                    />
                    <Route
                      path={`${path}/bank_Details`}
                      component={AllBankDetails}
                    />
                    <Route
                      path={`${path}/payment_history`}
                      component={AllPaymentHistory}
                    />
                    <Route
                      path={`${path}/all_appointments`}
                      component={AllAppointment}
                    />
                    <Route
                      path={`${path}/all_bookings/:id`}
                      component={AllBookings}
                    />
                    <Route path={`${path}/cab_booking/:id`} component={AllCabBooking} />
                    <Route
                      path={`${path}/booking`}
                      component={ViewEachBooking}
                    />
                    <Route path={`${path}/cab`} component={ViewEachCabBooking} />
                    <Route
                      path={`${path}/booking/change_status/:id`}
                      component={ChangeStatus}
                    />
                    <Route
                      path={`${path}/booking/refund_payment`}
                      component={RefundPayment}
                    />
                    <Route
                      path={`${path}/booking/crowl_back`}
                      component={CrowlBack}
                    />
                    <Route
                      path={`${path}/payment/:id`}
                      component={ViewEachPayment}
                    />
                    <Route
                      path={`${path}/appoitment/change_status`}
                      component={ChangeAppoitmentStatus}
                    />
                    {/* <Route path={`${path}/fqa`} component={FQATable} /> */}
                    <Route
                      path={`${path}/create_notification`}
                      component={CreateNotification}
                    />
                    <Route
                      path={`${path}/mln_user/:id`}
                      component={ViewMLNUser}
                    />
                    <Route
                      path={`${path}/view_mln_referral_user/:id`}
                      component={EditMLNUser}
                    />
                    <Route
                      path={`${path}/mln_profit/:id`}
                      component={MarginProfit}
                    />
                    <Route
                      path={`${path}/fee_margin/:id`}
                      component={FeeMargin}
                    />
                    <Route path={`${path}/details`} component={LayoutRoutes} />
                    <Route
                      path={`${path}/create_stickey_notice`}
                      component={AddStickyNotice}
                    />
                    <Route
                      path={`${path}/view_stickey_notice`}
                      component={ViewStickeyNote}
                    />
                    <Route
                      path={`${path}/Edit_stickey_notice`}
                      component={EditStickyNote}
                    />
                    <Route
                      path={`${path}/create_popup`}
                      component={CreatePopup}
                    />
                    <Route path={`${path}/view_popup`} component={ViewPopup} />
                    <Route path={`${path}/edit_popup`} component={EditPopup} />
                    <Route
                      path={`${path}/create_banner`}
                      component={CreateBanner}
                    />
                    <Route
                      path={`${path}/view_banner`}
                      component={ViewBanner}
                    />
                    {/* <Route
                      path={`${path}/edit_banner`}
                      component={EditBanner}
                    /> */}
                    <Route path={`${path}/create_fqa`} component={CreateFAQ} />
                    <Route path={`${path}/add_banner`} component={AddBanner} />
                    <Route
                      path={`${path}/view_banners/:id`}
                      component={ViewBanners}
                    />
                    <Route
                      path={`${path}/edit_banner/:id`}
                      component={EditBanner}
                    />
                    <Route path={`${path}/viw_faqs/:id`} component={ViewFAQs} />
                    <Route
                      path={`${path}/edit_faqs/:id`}
                      component={EditFAQs}
                    />
                    <Route
                      path={`${path}/edit_popups/:id`}
                      component={EditPopup}
                    />
                    <Route
                      path={`${path}/edit_approved_banner`}
                      component={EditApprovedBanner}
                    />
                    <Route
                      path={`${path}/view_approved_banner`}
                      component={ViewApprovedBanner}
                    />
                    <Route
                      path={`${path}/view_document/:id`}
                      component={ViewDocument}
                    />
                    <Route
                      path={`${path}/edit_document/:id`}
                      component={EditDocument}
                    />
                    <Route
                      path={`${path}/view_pendding_document/:id`}
                      component={ViewPenddingDocument}
                    />
                    <Route
                      path={`${path}/edit_pendding_document/:id`}
                      component={EditPendingDoc}
                    />
                    <Route
                      path={`${path}/edit_disapprove_document/:id`}
                      component={EditDisapproveDoc}
                    />
                    
                    <Route
                      path={`${path}/feed_back`}
                      component={DissaproveFeedBack}
                    />
                    <Route
                      path={`${path}/create_ticket`}
                      component={CreateTicket}
                    />
                    <Route
                      path={`${path}/view_ticket/:id`}
                      component={ViewTicket}
                    />
                    <Route
                      path={`${path}/edit_ticket/:id`}
                      component={EditTicket}
                    />
                    <Route
                      path={`${path}/tips_management_records`}
                      component={ViewtipsRecords}
                    />
                    <Route
                      path={`${path}/sp_management/change_status/:id`}
                      component={ChangeSeviceSeekerStatus}
                    />
                    <Route
                      path={`${path}/view_sp_management/:id`}
                      component={EditViewSpManagement}
                    />
                    <Route
                      path={`${path}/all_earnings`}
                      component={AllEarnings}
                    />
                    <Route
                      path={`${path}/view_earning/:id`}
                      component={ViewEachEarning}
                    />
                    <Route
                      path={`${path}/rating_reviews/:id`}
                      component={AllRatingReviews}
                    />
                    <Route
                      path={`${path}/edit_sp_management/:id`}
                      component={EditServiceProvider}
                    />
                    <Route path="/mooner/obj_booking/:id" render={(props) => <BookingObject id={props.match.params.id} />} />
                    <Route path="/mooner/single_service/:id" render={(props) => <ServiceObject id={props.match.params.id} />} />
                    <Route path="/mooner/stripe_object/:id" render={(props) => <StripeObject id={props.match.params.id} />} />
                    <Route path="/mooner/gas_object/:id" render={(props) => <GasObject id={props.match.params.id} />} />
                    <Route path="/mooner/ss_object/:id" render={(props) => <SSpentObject id={props.match.params.id} />} />
                    <Route path="/mooner/amout_paid_object/:id" render={(props) => <AmountPaid id={props.match.params.id} />} />
                    <Route path="/mooner/sp_earning_mln_object/:id" render={(props) => <SpEarningMln id={props.match.params.id} />} />
                    <Route path="/mooner/active_users_object/:id" render={(props) => <ActiveUser id={props.match.params.id} />} />
                    <Route path="/mooner/non_active_users_object/:id" render={(props) => <NonActiveUser id={props.match.params.id} />} />
                    <Route path="/mooner/cancel_booking_object/:id" render={(props) => <CancelBooking id={props.match.params.id} />} />
                    <Route path="/mooner/ongoing_booking_object/:id" render={(props) => <Ongoing id={props.match.params.id} />} />
                    <Route path="/mooner/tservice_object/:id" render={(props) => <TServiceProvider id={props.match.params.id} />} />
                    {/* <Route path={`${path}/single_service/:id`} component={ServiceObject} /> */}
                    {/* <Route path={`${path}/obj_booking/:id`} component={BookingObject} /> */}

                    {/* <Route path={`${path}/stripe_object/:id`} component={SSpentObject} /> */}
                    {/* <Route path={`${path}/gas_object/:id`} component={GasObject}  /> */}
                    <Route path={`${path}/retention_object/:id`} component={RetentionObject} />
                    <Route
                      path={`${path}/sp_all_bookings/:id`}
                      component={AllSpBookings}
                    />
                    <Route
                      path={`${path}/single_sp_booking/:id`}
                      component={ViewCompletedBooking}
                    />
                    <Route
                      path={`${path}/changepassword/:id`}
                      component={ChangePassword}
                    />
                    <Route path={`${path}/add_items`} component={AddItems} />
                    <Route
                      path={`${path}/cancellation_management_view`}
                      component={ViewCanclellationManagement}
                    />
                    <Route
                      path={`${path}/cancellation_management/:From`}
                      component={RefundAndAllocate}
                    />
                    <Route
                      path={`${path}/create_sub_admin`}
                      component={CreateSubAdmin}
                    />
                    <Route
                      path={`${path}/create_role`}
                      component={CreateRole}
                    />
                    <Route
                      path={`${path}/add_country`}
                      component={addCountry}
                    />
                    <Route
                      path={`${path}/change_status/:id`}
                      component={ChangeUserStatus}
                    />
                    <Route
                      path={`${path}/sub_admin/add_permissions/:id`}
                      component={AddPermissions}
                    />
                    <Route
                      path={`${path}/sub_admin/remove_permissions/:id`}
                      component={RemovePermissions}
                    />
                    {/* <Route
                      path={`${path}/change_status/:id`}
                      component={ChangeUserStatus}
                    /> */}
                    <Route
                      path={`${path}/test_question`}
                      component={TestQuestion}
                    />
                    <Route
                      path={`${path}/create_kyc_question`}
                      component={AddKycQuestion}
                    />
                    <Route
                      path={`${path}/sp_kyc_list/:id`}
                      component={SpAllDocuments}
                    />
                    <Route
                      path={`${path}/view_ratting_reviews/:id`}
                      component={ViewRatting}
                    />
                    <Route
                      path={`${path}/edit_ratting_reviews/:id`}
                      component={EditRatting}
                    />
                    <Route
                      path={`${path}/set_token_rate`}
                      component={SetTokenRate}
                    />
                    <Route path={`${path}/about_us`} component={AboutUs} />
                    <Route
                      path={`${path}/terms_conditions`}
                      component={TermsAndConditions}
                    />
                    <Route
                      path={`${path}/privicy_policy`}
                      component={PrivicyPolicy}
                    />
                    <Route
                      path={`${path}/common_documents`}
                      component={PostCommonDocs}
                    />
                    <Route
                      path={`${path}/view_category_kec/:id`}
                      component={ViewCommonKyc}
                    />
                    <Route
                      path={`${path}/edit_category_kec/:id`}
                      component={EditCommonKyc}
                    />
                    <Route
                      path={`${path}/add_category_specfic_kec`}
                      component={AddSprcficKyc}
                    />
                    <Route
                      path={`${path}/view_category_specfic_kec/:id`}
                      component={ViewSpecficKyc}
                    />
                    <Route
                      path={`${path}/edit_pending_dispute/:id`}
                      component={EditPendingDisputes}
                    />
                    <Route
                      path={`${path}/edit_pending_cab_dispute/:id`}
                      component={EditPendingCabDisputes}
                    />
                    <Route
                      path={`${path}/edit_aprove_dispute/:id`}
                      component={EditAproveDispute}
                    />
                    <Route
                      path={`${path}/edit_category_specfic_document/:id`}
                      component={EditSpecficKyc}
                    />
                    <Route
                      path={`${path}/paidout_listing`}
                      component={PaidoutListing}
                    />
                    <Route
                      path={`${path}/mln_listing`}
                      component={MlnListing}
                    />
                    <Route
                      path={`${path}/bookings_listing`}
                      component={BookingsListing}
                    />
                    <Route
                      path={`${path}/edit_kyc_answer/:id`}
                      component={EditKycAnswers}
                    />
                    <Route path={`${path}/total_booking/`} component={BookingTable} />
                    {/* <Redirect to={`${path}/404`} /> */}

                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </>
    </Switch>
  );
};
const mapStateToProps = ({ }) => {
  return {};
};
export default connect(mapStateToProps, {
  getAllNotification,
})(DashboardRoutes);
