// this is a custom hook: hook layer

import {useContext} from 'react';
import {AuthContext} from '../auth.context';


export function useAuth(){
    const context= useContext(AuthContext)

    return context;
}
