import React from 'react';
import { createHashRouter } from 'react-router-dom';

import userRoutes from './productedRoutes/userRoutes';

const router = createHashRouter([...userRoutes], 
// {
//   basename: CONFIG.BASE_URL // Set the base URL here
// }
);

export default router;
