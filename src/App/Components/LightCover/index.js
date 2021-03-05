import React, { useContext } from 'react';
import './LightCover.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from 'App/GlobalStorage/StateStorage';
import { observer } from 'mobx-react-lite';

const LightCover = observer((props) => {

    const { globalStateStorage } = useContext(AppContext);

    const isLoading = globalStateStorage.pendingRequest;

    const style = {
        visibility: isLoading ? 'visible' : 'hidden',
        opacity: isLoading ? '1' : '0'
    };

    return (
        <div id="light_cover" style={style}>
            <div className="light_cover_info">
                <FontAwesomeIcon icon={faSpinner} size="5x" spin />
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
});

export default LightCover;