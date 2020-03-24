import React, { Component } from "react";
import PostData from "../../data/posts.json";

import CustomizedTreeView from "./CustomizedTreeView";

class PostList extends Component {
    render() {
        return (
            <div>
                <h1 style={{ color: "#104777" }}>La Liga</h1>
                <CustomizedTreeView post={PostData} />
            </div>
        );
    }
}

export default PostList;
