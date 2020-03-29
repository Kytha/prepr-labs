import React from "react";
import intersection from "lodash.intersection";
import difference from "lodash.difference";
import { connect } from "react-redux";
import { get } from "../lib/utils";

function Permissible({
    children,
    requiredPermissions,
    onlyOne,
    otherwise,
    auth
}) {
    const { user, isLoading } = auth;
    const userPermissions = get(["permissions"])(user);
    const isSuperUser = get(["is_superuser"])(user);

    if (!children || isLoading || !requiredPermissions) {
        return null;
    }
    if (isSuperUser) return children;
    const permissionStatus = onlyOne
        ? intersection(userPermissions, requiredPermissions).length
        : difference(requiredPermissions, userPermissions).length === 0;

    if (permissionStatus) return children;
    else if (otherwise) return otherwise;
    else return null;
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Permissible);
