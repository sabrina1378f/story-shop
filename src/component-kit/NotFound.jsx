import React from 'react'
import { useHistory } from 'react-router-dom'
import img from '../images/notfound2.png'
import { Button } from '@material-ui/core'

function NotFound() {
    let history = useHistory()
    return (
        <div style={{ paddingTop: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img src={img} alt="" height='450px' />
            <Button style={{ backgroundColor: ' #af601a  ', padding: '10px', fontSize: '20px', marginTop: '15px', color: 'white' }}
                onClick={() => history.push('/')}
            >بازگشت به صفحه اصلی سایت</Button>
        </div>
    )
}

export default NotFound
