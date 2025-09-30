import React, { Suspense } from 'react'
import NewEcuDrawer from './NewEcuDrawer'

const EcuFormDrawer = ({ isOpen, onClose, handleSubmit }) => {
    return (
        <Suspense fallback={<div>Loading Drawer</div>}>
            <NewEcuDrawer isOpen={isOpen}
                onClose={onClose}
                handleSubmit={handleSubmit} />
        </Suspense>
    )
}

export default EcuFormDrawer