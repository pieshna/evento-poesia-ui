import Inscripcion from '../inscripcion/Inscripcion';
import Nueva from '../inscripcion/Nueva';
import List from '../inscripcion/List';

const Routes = [
    {
        path: "/",
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
    }

]

export default Routes;