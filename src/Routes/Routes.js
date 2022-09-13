import Inscripcion from '../inscripcion/Inscripcion';
import Nueva from '../inscripcion/Nueva';
import List from '../inscripcion/List';
import Home from '../Home';

const Routes = [
    {
        path: "/estudiante",
        exact: true,
        element: <Inscripcion />
    },
    {
        path: "/inscripcion",
        element: <Nueva />,
        exact: true
    },
    {
        path: "/inscripcion/list",
        element: <List />,
        exact: true
    },
    {
        path: "/",
        element:<Inscripcion/>,
        exact: true
    }

]

export default Routes;