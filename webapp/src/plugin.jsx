import React from 'react';
import ClipboardJS from 'clipboard';
import {getPost} from 'mattermost-redux/selectors/entities/posts';

import {id as pluginId} from './manifest';

export default class CopyPlugin {
    initialize(registry, store) {
        registry.registerPostDropdownMenuAction(<span className='copy-plugin-button'>{'Copy Text'}</span>, (postId) => {
            const state = store.getState();
            const post = getPost(state, postId);

            // Try using navigator.clipboard for better error handling and
            // insurance that the clipboard was updated. Fall back to original
            // copy method if that isn't supported.
            // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard
            var clipboard = navigator.clipboard;
            if (typeof clipboard === 'undefined') {
                const _ = new ClipboardJS('.copy-plugin-button', {
                    text: () => {
                        return post && post.message;
                    },
                });
                document.getElementsByClassName('copy-plugin-button')[0].click();
            } else {
                clipboard.writeText(post.message).then(() => {
                    // Success!
                }).catch((err) => {
                    console.error('Unable to copy to clipboard', err);
                });
            }
        });
    }

    uninitialize() {
        //eslint-disable-next-line no-console
        console.log(pluginId + '::uninitialize()');
    }
}
