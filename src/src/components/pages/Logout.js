export default function Logout(prop) {
    prop.isAdmin()
    prop.isCustomer()
    prop.submit()
    window.location.assign("http://localhost:3000/");
}