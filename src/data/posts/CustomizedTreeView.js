import React, { useState } from "react";
import useCollapse from "react-collapsed";
import classNames from "classnames";
import PropTypes from "prop-types";
import SvgIcon from "@material-ui/core/SvgIcon";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Collapse from "@material-ui/core/Collapse";
import { useSpring, animated } from "react-spring/web.cjs";
import Button from "@material-ui/core/Button";
function MinusSquare(props) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
        </SvgIcon>
    );
}

function PlusSquare(props) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
        </SvgIcon>
    );
}

function CloseSquare(props) {
    return (
        <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
        </SvgIcon>
    );
}

function TransitionComponent(props) {
    const style = useSpring({
        from: { opacity: 0, transform: "translate3d(20px,0,0)" },
        to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` }
    });

    return (
        <animated.div style={style}>
            <Collapse {...props} />
        </animated.div>
    );
}

TransitionComponent.propTypes = {
    in: PropTypes.bool
};

const useStyles = makeStyles({
    root: {
        height: 264,
        flexGrow: 1,
        maxWidth: 400
    },
    categoryButton: {
        fontWeight: 600,
        fontSize: 14,
        width: 120,
        height: 36,
        borderRadius: 22,
        "&:hover": {
            backgroundColor: "#5AD29F",
            boxShadow: "0px 3px 9px #3E4B5A"
        }
    },
    selected: {
        backgroundColor: "#A2B4C5",
        color: "white"
    },
    notSelected: {
        backgroundColor: "#5AD29F",
        color: "white"
    },
    treePosition: {
        display: "flex",
        justifyContent: "center",
        marginTop: 50
    }
});

export default function CustomizedTreeView(props) {
    const classes = useStyles();
    const [isOpen, setOpen] = useState(false);
    const { getCollapseProps, getToggleProps } = useCollapse({ isOpen });
    let list = [];
    const displayTree = jsonData => {
        let newPostList = null;
        newPostList = jsonData.map((branch, key) => {
            return (
                <TreeItem key={key} nodeId={branch.name} label={branch.name}>
                    {branch.children ? (list = displayTree(branch.children)) : null}
                </TreeItem>
            );
        });
        return newPostList;
    };

    list = displayTree(props.post);

    return (
        <div>
            <Button
                className={classNames(classes.categoryButton, isOpen ? classes.selected : classes.notSelected)}
                {...getToggleProps({
                    onClick: () => setOpen(oldOpen => !oldOpen)
                })}
            >
                {isOpen ? "Collapse" : "Expand"}
            </Button>
            <div className={classes.treePosition}>
                <TreeView
                    {...getCollapseProps()}
                    className={classes.root}
                    defaultExpanded={["1"]}
                    defaultCollapseIcon={<MinusSquare />}
                    defaultExpandIcon={<PlusSquare />}
                    defaultEndIcon={<CloseSquare />}
                >
                    {list}
                </TreeView>
            </div>
        </div>
    );
}
