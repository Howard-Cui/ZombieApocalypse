import HomePage from "../page/HomePage.page";
import InputForm from "../components/InputForm.component";
import Start from "../components/Start.component";
import Display from "../components/Display.component";

const router = [
    {
        path: '/',
        element: <HomePage/>,
        children: [
            {
                path: '/',
                element: <Start/>
            },
            {
                path: '/input',
                element: <InputForm/>
            },
            {
                path: '/display',
                element: <Display/>
            }
        
        ]
    }
]


export default router;