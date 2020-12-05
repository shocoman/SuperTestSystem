import React, { Component, useState } from 'react';
import SortableTree, { walk } from 'react-sortable-tree';
import SortableTreeFullDragTheme from 'react-sortable-tree-theme-full-node-drag';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

let id_count = 0;

function getNodeKey({ node, treeIndex }) {
    // return node.title + '_' + treeIndex.toString();
    return node.id;
}

function makeNode(title, prob, temporary = false) {
    return {
        title,
        temporary,
        prob,
        subtitle: (e) => 'Frequency: ' + e.node.prob.toPrecision(2) + '; Code: ' + e.node.code,
        id: id_count++,
        code: '_',
    };
}

export default function HuffmanTree([msg]) {
    const [treeData, setTreeData] = useState(() => {
        let freq = {};
        for (let ch of Array.from(msg)) {
            freq[ch] = freq[ch] ? freq[ch] + 1 : 1;
        }

        return Object.entries(freq).map(([char, frequency]) =>
            makeNode(char, frequency / msg.length)
        );
        // return [ makeNode('A', 0.3),  makeNode('B', 0.3),  makeNode('C', 0.1),  makeNode('D', 0.2),  makeNode('E', 0.1), ]
    });

    const canDrop = (params) => {
        const { nextParent } = params;

        return !(nextParent && (!nextParent.temporary || nextParent.children.length > 2));
    };

    const onMoveNode = (params) => {
        const { treeData, nextParentNode, prevPath } = params;

        if (prevPath.length >= 2) {
            let p = prevPath[prevPath.length - 2];
            let n = null;
            walk({
                treeData,
                getNodeKey,
                ignoreCollapsed: false,
                callback: ({ node }) => {
                    if (node.id === p) n = node;
                },
            });
            if (n != null) {
                n.prob = n.children.reduce((acc, curr) => acc + curr.prob, 0);
                n.title =
                    '{ ' + n.children.reduce((acc, curr) => acc + curr.title + ' ', ' ') + ' }';
            }
        }

        if (!nextParentNode || !nextParentNode.temporary) return;
        nextParentNode.prob = nextParentNode.children.reduce((acc, curr) => acc + curr.prob, 0);
        nextParentNode.title = `{${nextParentNode.children.reduce(
            (acc, curr) => acc + curr.title + '',
            ''
        )}}`;

        const mywalk = (node, code) => {
            node.code = code;
            if (node.children && node.children.length >= 1) {
                mywalk(node.children[0], code + '0');
                if (node.children.length >= 2) {
                    mywalk(node.children[1], code + '1');
                }
            }
        };

        for (let i = 0; i < treeData.length; ++i) mywalk(treeData[i], '');
    };

    const onClick = (e) => {
        setTreeData((prevTree) => {
            let next = [...prevTree];
            next.push(makeNode('TMP', 0.0, true));
            return next;
        });
    };

    return (
        <div
            className={'nes-container is-rounded with-title'}
            style={{ height: '600px', marginTop: 20, paddingBottom: 100 }}
        >
            <p className={'title'}>Редактор деревьев</p>
            <button className={'nes-btn'} style={{ margin: '20px' }} onClick={onClick}>
                Добавить узел-связку
            </button>
            <SortableTree
                treeData={treeData}
                onChange={(treeData) => setTreeData(treeData)}
                onMoveNode={onMoveNode}
                canDrop={canDrop}
                getNodeKey={getNodeKey}
                theme={SortableTreeFullDragTheme}
            />
        </div>
    );
}
