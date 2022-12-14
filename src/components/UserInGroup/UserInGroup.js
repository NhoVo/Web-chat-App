import TippyHeadless from '@tippyjs/react/headless';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { faEllipsis, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MoreHoriz } from '@material-ui/icons';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import Popper from '../Popper';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './UserInGroup.module.scss';
import ModelInfoAccount from '../ModelWrapper/ModelInfoAccount';
import { infoUserConversation } from '~/redux/features/user/userCurrent';
import { addFriendRequest, conversationSlice, filterFriendGroup, filterLeader, userLogin } from '~/redux/selector';
import { fetchApiRecallRequestAddFriend, friendRequests } from '~/redux/features/friend/friendRequestSlice';
import {
    blockMember,
    cancelBlockMember,
    changeLearder,
    deleteConversation,
    deleteMember,
    outGroup,
} from '~/redux/features/Group/GroupSlice';

const cx = classNames.bind(styles);

function UserInGroup({ user, conversationInfo }) {
    const [Friend, setFriend] = useState(false);
    const [meRequest, setMeRequest] = useState(false);
    console.log('[meRequest] -> ', meRequest);
    const dispatch = useDispatch();

    const filterLeaders = useSelector(filterLeader);
    const infoUser = useSelector(userLogin);
    const listMeRequest = useSelector(addFriendRequest);
    const listFriendFilters = useSelector(filterFriendGroup);
    const conversationClicked = useSelector(conversationSlice);

    console.log('[listMeRequest] -> ', listMeRequest);

    useEffect(() => {
        listFriendFilters?.map((key) => {
            if (key._id === user._id) {
                setFriend(true);
            }
        });
    }, []);

    useEffect(() => {
        listMeRequest?.map((key) => {
            if (key.receiverId === user._id) {
                setMeRequest(true);
            }
        });
    }, []);

    const handleSeeninfoInGroup = () => {
        dispatch(
            infoUserConversation({
                userID: user._id,
            }),
        );
    };

    // thu hoi ket ban
    const handleCallback = () => {
        const Request = listMeRequest.filter((friend) => friend.receiverId.includes(user._id));
        const data = {
            status: true,
            senderID: infoUser._id,
            idRequest: Request[0].idFriendRequest,
        };
        dispatch(fetchApiRecallRequestAddFriend(data));
        toast.success('B???n ???? thu h???i l???i m???i k???t b???n.');
    };

    //k???t b???n
    const handleAddFriend = () => {
        const data = { senderID: infoUser._id, receiverID: user._id };

        let tam = dispatch(friendRequests(data));
        if (tam) {
            toast.success('G???i l???i m???i k???t b???n th??nh c??ng.');
        }
    };

    //roi nhom
    const handleOutGroup = () => {
        let checkOutGroup = window.confirm('B???n c?? ch???c ch???n mu???n r???i nh??m kh??ng?');
        if (checkOutGroup === true) {
            const dataOutGroup = {
                userId: infoUser._id,
                conversationId: conversationClicked.id,
            };
            toast.success('B???n ???? r???i kh???i nh??m th??nh c??ng.');
            dispatch(outGroup(dataOutGroup));
        } else {
            toast.error('B???n ???? h???y y??u c???u r???i nh??m!');
            return;
        }
    };

    const handleDeleteGroup = () => {
        let checkOutGroup = window.confirm('B???n c?? ch???c ch???n mu???n gi???i t??n nh??m kh??ng?');
        if (checkOutGroup === true) {
            const data = {
                conversationId: conversationClicked.id,
                mainId: filterLeaders[0]._id,
            };
            toast.success('B???n ???? gi???i t??n nh??m.');
            dispatch(deleteConversation(data));
        } else {
            toast.error('B???n ???? h???y y??u c???u gi???i t??n nh??m!');
            return;
        }
    };

    const handleChangeLeader = () => {
        let checkOutGroup = window.confirm('B???n c?? ch???c ch???n mu???n chuy???n quy???n tr?????ng nh??m kh??ng?');
        if (checkOutGroup === true) {
            const data = {
                conversationId: conversationClicked.id,
                userId: user._id,
            };
            dispatch(changeLearder(data));
            toast.success('B???n ???? chuy???n quy???n tr?????ng nh??m th??nh c??ng.');
        } else {
            toast.info('B???n ???? h???y y??u c???u chuy???n quy???n tr?????ng nh??m!');
            return;
        }
    };

    const handleDeleteMemberGroup = () => {
        let deletes = window.confirm('B???n c?? ch???c ch???n mu???n x??a th??nh vi??n n??y kh??ng?');
        if (deletes === true) {
            const data = {
                conversationId: conversationClicked.id,
                memberId: user._id,
                mainId: filterLeaders[0]._id,
            };
            toast.success('X??a th??nh vi??n th??nh c??ng.');
            dispatch(deleteMember(data));
        } else {
            toast.error('B???n ???? h???y y??u c???u!');
            return;
        }
    };

    const handleCancelBlockMember = () => {
        let checkOutGroup = window.confirm('B???n c?? ch???c ch???n mu???n b??? ch???n tin nh???n kh??ng?');
        if (checkOutGroup === true) {
            const data = {
                conversationId: conversationClicked.id,
                userId: user._id,
            };
            dispatch(cancelBlockMember(data));
            toast.success('B???n ???? b??? ch???n tin nh???n th??nh c??ng.');
        } else {
            toast.error('B???n ???? h???y y??u c???u b??? ch???n tin nh???n!');
            return;
        }
    };

    const handleBlockMember = () => {
        let checkOutGroup = window.confirm('B???n c?? ch???c ch???n mu???n ch???n tin nh???n kh??ng?');
        if (checkOutGroup === true) {
            const data = {
                conversationId: conversationClicked.id,
                userId: user._id,
            };
            dispatch(blockMember(data));
            toast.success('B???n ???? ch???n tin nh???n th??nh c??ng.');
        } else {
            toast.error('B???n ???? h???y y??u c???u ch???n tin nh???n!');
            return;
        }
    };

    return (
        <>
            {conversationInfo ? (
                <div className={cx('list-conversation')} onClick={handleSeeninfoInGroup}>
                    <img
                        className={cx('avatar-img')}
                        src={user?.imageLinkOfConver} // user?.imageLinkOfConver ? : images.noImg
                        alt="avatar-user"
                    />

                    {/* <ModelInfoAccount seenInfoInGroup user={userCurrent} /> */}

                    {filterLeaders[0]?._id === user?._id ? (
                        <div className={cx('key-leader')}>
                            <label htmlFor="file-info" className={cx('option-avatar')}>
                                <FontAwesomeIcon className={cx('icon-camera')} icon={faKey} />
                            </label>
                        </div>
                    ) : null}
                    <div className={cx('content')}>
                        <h4 className={cx('username')}>{user?.name} </h4>
                    </div>

                    {!Friend && infoUser?._id !== user?._id ? (
                        <>
                            {/* meRequest */}
                            {listMeRequest[0]?.receiverId === user?._id ? (
                                <div className={cx('button-addFriend')} onClick={handleCallback}>
                                    <button>Thu h???i</button>
                                </div>
                            ) : (
                                <div className={cx('button-addFriend')} onClick={handleAddFriend}>
                                    <button>K???t b???n</button>
                                </div>
                            )}
                        </>
                    ) : null}

                    {filterLeaders[0]._id === user?._id && infoUser._id === filterLeaders[0]._id ? (
                        <TippyHeadless
                            render={(attrs) => (
                                <div tabIndex="-1" {...attrs}>
                                    <Popper className={cx('own-menu-list-children')}>
                                        <p className={cx('deleteFriend')} onClick={handleOutGroup}>
                                            <button className={cx('item-btn')}>R???i nh??m</button>
                                        </p>
                                        <p className={cx('deleteFriend')} onClick={handleDeleteGroup}>
                                            <button className={cx('item-btn')}>Gi???i t??n nh??m</button>
                                        </p>
                                    </Popper>
                                </div>
                            )}
                            interactive
                            trigger="click"
                            placement="bottom-start"
                            offset={[4, 4]}
                        >
                            <Tippy className={cx('tool-tip')} content="L???a ch???n" delay={[200, 0]}>
                                <div>
                                    <MoreHoriz className={cx('item')} />
                                </div>
                            </Tippy>
                        </TippyHeadless>
                    ) : (
                        <>
                            {infoUser._id === filterLeaders[0]._id ? (
                                <TippyHeadless
                                    render={(attrs) => (
                                        <div tabIndex="-1" {...attrs}>
                                            <Popper className={cx('own-menu-list-children')}>
                                                <p className={cx('deleteFriend')} onClick={handleChangeLeader}>
                                                    <button className={cx('item-btn')}>Chuy???n quy???n nh??m tr?????ng</button>
                                                </p>
                                                <p className={cx('deleteFriend')} onClick={handleDeleteMemberGroup}>
                                                    <button className={cx('item-btn')}>X??a kh???i nh??m</button>
                                                </p>

                                                {/* conversationID conversationClick */}
                                                {conversationClicked.blockBy.includes(user?._id) ? (
                                                    <p className={cx('deleteFriend')} onClick={handleCancelBlockMember}>
                                                        <button className={cx('item-btn')}>B??? ch???n</button>
                                                    </p>
                                                ) : (
                                                    <p className={cx('deleteFriend')} onClick={handleBlockMember}>
                                                        <button className={cx('item-btn')}>Ch???n tin nh???n</button>
                                                    </p>
                                                )}
                                            </Popper>
                                        </div>
                                    )}
                                    interactive
                                    trigger="click"
                                    placement="bottom-start"
                                    offset={[4, 4]}
                                >
                                    <Tippy className={cx('tool-tip')} content="L???a ch???n" delay={[200, 0]}>
                                        <div>
                                            <MoreHoriz className={cx('item')} />
                                        </div>
                                    </Tippy>
                                </TippyHeadless>
                            ) : (
                                <>
                                    {infoUser._id === user?._id ? (
                                        <TippyHeadless
                                            render={(attrs) => (
                                                <div tabIndex="-1" {...attrs}>
                                                    <Popper className={cx('own-menu-list-children')}>
                                                        <p className={cx('deleteFriend')} onClick={handleOutGroup}>
                                                            <button className={cx('item-btn')}>R???i nh??m</button>
                                                        </p>
                                                    </Popper>
                                                </div>
                                            )}
                                            interactive
                                            trigger="click"
                                            placement="bottom-start"
                                            offset={[4, 4]}
                                        >
                                            <Tippy className={cx('tool-tip')} content="L???a ch???n" delay={[200, 0]}>
                                                <div>
                                                    <MoreHoriz className={cx('item')} />
                                                </div>
                                            </Tippy>
                                        </TippyHeadless>
                                    ) : null}
                                </>
                            )}
                        </>
                    )}
                </div>
            ) : null}
        </>
        // <div className={cx('list-conversation')}>
        //     <img
        //         className={cx('avatar-img')}
        //         src={user?.imageLinkOfConver} // conversation?.imageLinkOfConver ? : images.noImg
        //         alt="avatar-user"
        //     />
        //     <div className={cx('content')}>
        //         <h4 className={cx('username')}>{user?.name} </h4>
        //     </div>
        //     <div>
        //         <MoreHoriz className={cx('item')} />
        //     </div>
        // </div>
    );
}

export default UserInGroup;
