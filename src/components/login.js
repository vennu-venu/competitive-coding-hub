import "../styles/login.css";

function Login(){
    return(
        <div class="main">
        <form class="box" action="" method="post">
            <h1>Login</h1>
            <input type="text" name="" placeholder="Username" required/>
            <input type="password" name="" placeholder="Password" required/>
            <input type="submit" name="" value="Login"/> 
        </form>
        </div>
    );
}

export default Login;