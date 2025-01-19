import { combineReducers } from "redux";

import authReducer from "./auth/auth.reducer";
import errorReducer from "./error/error.reducer";
import usersReducer from "./users/users.reducer";
import categoryReducer from "./category/category.reducer";
import subCategoryReducer from "./subCategory/subcategory.reducer";
import questionaireReducer from "./questionaire/questionaire.reducer";
import loaderReducer from "./loader/loader.reducer";
import ServiceProviderReducer from "./spManagement/spManagement.reducer";
import bookingReducer from "./booking/booking.reducer";
import CancellationReducer from "./cancellationManagement/cancellation.reducer";
import faqReducer from "./faq/faq.reducer";
import ChangePassswordReducer from "./changePassword/changePassword.reducer";
import ticketReducer from "./ticket/ticket.reducer";
import documentReducer from "./document/document.reducer";
import reportReducer from "./reports/report.reducer";
import mlnReducer from "./mln/mln.reducer";
import earningReducer from "./earning/earning.reducer";
import mnrReducer from "./mnr/mnr.reducer"; 
import RattingReducer from "./ratting/ratting.reducer";
import privicyReducer from "./privicy/privicy.reducer";
import categoryKyc from "./catgoryKyc/categorykyc.reducer";
import disputeManagement from "./dispute/dispute.reducer";
import notificationReducer from "./notifications/notification.reducer";
import analyticsReducer from "./analytics/analytics.reducer";
import cabBookingReducer from "./cabbooking/cabbooking.reducer";
import adminNotificationReducer from "./adminNotification/adminNotification.reducer";
import popupReducer from "./popup/popup.reducer";

export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	loader: loaderReducer,
	users: usersReducer,
	category: categoryReducer,
	subCategory: subCategoryReducer,
	questionaire: questionaireReducer,
	booking: bookingReducer,
	capBooking:cabBookingReducer,
	spManagement: ServiceProviderReducer,
	faq: faqReducer,
	changepassword: ChangePassswordReducer,
	ticket: ticketReducer,
	document: documentReducer,
	report: reportReducer,
	mln: mlnReducer,
	earning: earningReducer,
	mnr: mnrReducer,
	ratting: RattingReducer,
	privacy: privicyReducer,
	categoryKycData: categoryKyc,
	dispute: disputeManagement,
	cancel: CancellationReducer,
	notification: notificationReducer,
	analytics:analyticsReducer,
	popup:popupReducer,
	adminNotification:adminNotificationReducer
});
