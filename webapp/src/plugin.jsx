import React from 'react';
import ClipboardJS from 'clipboard';
import {getPost} from 'mattermost-redux/selectors/entities/posts';

import {id as pluginId} from './manifest';

export default class DemoPlugin {
    initialize(registry, store) {
        registry.registerPostDropdownMenuAction(<span className='copy-plugin-button'>{'Copy'}</span>, (postId) => {
            const _ = new ClipboardJS('.copy-plugin-button', {
                text: () => {
                    const state = store.getState();
                    const post = getPost(state, postId);
                    return post && post.message;
                },
            });
            document.getElementsByClassName('copy-plugin-button')[0].click();
        });
    }

    uninitialize() {
        //eslint-disable-next-line no-console
        console.log(pluginId + '::uninitialize()');
    }
}
