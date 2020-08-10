import React, { useState } from 'react';

import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import DocumentList from './documents/DocumentList';
import CommentList from './comments/CommentList';
// import classnames from 'clas';

const styles = {
    activeTab: {
        backgroundColor: 'lightblue'
    },
    tab: {
        cusror: 'copy'
    }
}

const DocumentsAndCommentsLayout = props => {

    const [activeTab, setActiveTab] = useState('1');
    const [docCount, setDocCount] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        style={activeTab === '1' ? { ...styles.activeTab, ...styles.tab } : { ...styles.tab }}
                        onClick={() => { toggle('1'); }}
                    >
                        {docCount > 0 ? `Documents (${docCount})` : ' Documents'}
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        style={activeTab === '2' ? { ...styles.activeTab, ...styles.tab } : { ...styles.tab }}
                        onClick={() => { toggle('2'); }}
                    >
                        {commentsCount > 0 ? `Comments (${commentsCount})` : ' Comments'}
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            <DocumentList
                                setDocCount={setDocCount}
                                taskGuid={props.taskId}
                                portfolioId={props.portfolioId}
                            />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Col sm="12">
                            <CommentList
                                setCommentsCount={setCommentsCount}
                                taskGuid={props.taskId}
                                portfolioId={props.portfolioId}
                            />
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </>
    )
}

export default DocumentsAndCommentsLayout;