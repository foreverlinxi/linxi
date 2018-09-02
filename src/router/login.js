import Login from '@/components/login'
import Register from '@/components/login/register'
import SignIn from '@/components/login/sign-in'
import ChangePhone from '@/components/login/change-phone'

export default {
  path: '/login',
  name: 'Login',
  component: Login,
  children: [
    {
      path: 'register',
      name: 'Register',
      component: Register
    },
    {
      path: 'signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: 'changePhone',
      name: 'ChangePhone',
      component: ChangePhone
    }
  ]
}
