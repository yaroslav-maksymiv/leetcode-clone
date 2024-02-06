import {Provider} from "react-redux";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Layout from "./hocs/Layout";
import store from "./store";

import {Register} from "./containers/Register";
import {Login} from "./containers/Login";
import {Home} from "./containers/Home";
import {PasswordReset} from "./containers/PasswordReset";
import {PasswordResetConfirmation} from "./containers/PasswordResetConfirmation";
import {ProfileEdit} from "./containers/ProfileEdit";
import {Problem} from "./containers/Problem";
import {Problems} from "./containers/Problems";

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path='/' element={<Problems />} />
                        <Route path='/edit-profile' element={<ProfileEdit />} />
                        <Route path='/problem/:id' element={<Problem />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/password-reset' element={<PasswordReset />}/>
                        <Route path='/password/reset/confirm/:uid/:token' element={<PasswordResetConfirmation />}/>
                    </Routes>
                </Layout>
            </BrowserRouter>
        </Provider>
    )
}

export default App