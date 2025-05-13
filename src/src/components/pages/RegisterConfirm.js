/* page shown after succefully creating an account */

export default function RegisterConfirm() {
    return (
        <body className = "reg">
            <h1 style={{color:"white"}}>Thanks for Joining ABC. A Confirmation email will be sent to the email you provided.</h1>
            <div style={{paddingTop:'40px'}}>
            <a href = "/login">Procced to Login?</a>
            </div>
        </body>
    )
}