
<template>
    <nav class="navbar navbar-light bg-light mb-4">
        <div class="container-fluid">
            <a class="navbar-brand ms-5">Ads Qxd logo</a>
            <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>

            <div>
                <button class="btn btn-primary mx-2" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#login" aria-controls="login">Login</button>

                <button class="btn btn-outline-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#register">Register</button>
            </div>
        </div>
    </nav>


    <div class="offcanvas offcanvas-end" tabindex="-1" id="login" aria-labelledby="loginLabel">
        <div class="offcanvas-header">
            <h5 id="loginLabel">Login</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            ...
        </div>
    </div>

    
    <div class="offcanvas offcanvas-end" tabindex="-1" id="register" aria-labelledby="loginLabel">
        <div class="offcanvas-header">
            <h5 id="loginLabel">Register</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            ...
        </div>
    </div>
</template>


