import React, { Component, useState } from 'react';
import SortableTree, { walk, removeNodeAtPath } from 'react-sortable-tree';
import SortableTreeFullDragTheme from 'react-sortable-tree-theme-full-node-drag';
import 'react-sortable-tree/style.css';
import _ from 'lodash'; // This only needs to be imported once in your app

function getNodeKey({ node, treeIndex }) {
    // return node.title + '_' + treeIndex.toString();
    return node.id;
}

let id_count = 0;

function makeNode(title, prob, temporary = false) {
    return {
        title,
        temporary,
        prob,
        subtitle: (e) => 'Frequency: ' + e.node.prob.toPrecision(2) + '; Code: ' + e.node.code,
        id: id_count++,
        code: '_'
    };
}

export default function HuffmanTree({ params: [msg], userAnswer, onChange, checkCorrectAnswer, blockedInput }) {
    const initTreeState = () => {
        let freq = {};
        for (let ch of Array.from(msg)) {
            freq[ch] = freq[ch] ? freq[ch] + 1 : 1;
        }
        return Object.entries(freq).map(([char, frequency]) =>
            makeNode(char, frequency / msg.length)
        );
    };

    const treeData = userAnswer.additionalProperties?.tree ?? initTreeState();
    const setTreeData = (data) => {
        let answer = _.cloneDeep(userAnswer);
        answer.additionalProperties.tree = data;
        onChange(answer);
    };

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
                }
            });
            if (n != null) {
                n.prob = n.children.reduce((acc, curr) => acc + curr.prob, 0);
                n.title = '{ ' + n.children.reduce((acc, curr) => acc + curr.title + ' ', '') + ' }';
            }
        }

        if (!nextParentNode || !nextParentNode.temporary) return;
        nextParentNode.prob = nextParentNode.children.reduce((acc, curr) => acc + curr.prob, 0);
        // nextParentNode.title = `{${nextParentNode.children.reduce(
        //     (acc, curr) => acc + curr.title,
        //     ''
        // )}}`;
        nextParentNode.title = 'Узел-связка';

        const recursiveNaming = (node, code) => {
            node.code = code;
            if (node.children && node.children.length >= 1) {
                recursiveNaming(node.children[0], code + '0');
                if (node.children.length >= 2) {
                    recursiveNaming(node.children[1], code + '1');
                }
            }
        };

        let treeDataCopy = _.cloneDeep(treeData);
        for (let i = 0; i < treeData.length; ++i) recursiveNaming(treeDataCopy[i], '');
        setTreeData(treeDataCopy);
    };

    const onClick = (e) => {
        let next = _.cloneDeep(treeData);
        next.unshift(makeNode('Узел-связка', 0.0, true));
        setTreeData(next);
    };

    let treeIsCorrect = userAnswer.additionalProperties?.treeIsCorrect ?? false;

    let containerTitle = checkCorrectAnswer && treeIsCorrect ?
        (<p className={'title'} style={{ color: 'green' }}>Редактор деревьев (Дерево построено верно!) </p>)
        : (<p className={'title'}>Редактор деревьев</p>);
    if (checkCorrectAnswer && !treeIsCorrect && blockedInput)
        containerTitle =  (<p className={'title'} style={{ color: 'red' }}>Редактор деревьев (Дерево построено неверно!) </p>)

    const removeNodeButton = ({ node, path }) => (node.temporary && (!node.children || node.children?.length === 0) && {
        buttons: [
            <button onClick={() =>
                setTreeData(removeNodeAtPath({ treeData: treeData, path, getNodeKey }))}> X </button>
        ]
    });

    return (
        <div
            className={'nes-container is-rounded with-title'}
            style={{ height: '600px', marginTop: 20, paddingBottom: 100 }}
        >
            {containerTitle}
            <button className={'nes-btn'} style={{ margin: '20px' }} onClick={onClick}>
                Добавить узел-связку
            </button>
            <SortableTree
                treeData={treeData}
                onChange={setTreeData}
                onMoveNode={onMoveNode}
                canDrop={canDrop}
                getNodeKey={getNodeKey}
                theme={SortableTreeFullDragTheme}
                generateNodeProps={removeNodeButton}
            />
        </div>
    );
}
