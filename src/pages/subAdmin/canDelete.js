export const canDelete = (page) => {
  const role = localStorage.getItem("role");
  const all_permissions = JSON.parse(localStorage.getItem("all_permissions"));
  let del_permission = false;
  if (role == "Sub_Admin") {
    all_permissions?.map(
      (item) => {
        // if (page == "delete_categoryquestions") {
        if (item?.codename == page) {
          //("route matching", item?.codename, page);
          del_permission = true;
        }
      }
      // else if (page == "delete_faqs") {
      //   if (item?.codename == page) {
      //     //("route matching", item?.codename, page);
      //     del_permission = true;
      //   }
      // } else if (page == "delete_document") {
      //   if (item?.codename == page) {
      //     //("route matching", item?.codename, page);
      //     del_permission = true;
      //   }
      // }
      // }
    );
    return del_permission;
  } else {
    return true;
  }
};
