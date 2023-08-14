import AskModal from "../../common/AskModal";

const AdminEventAskRemoveModalComponent = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  return (
    <AskModal
      visible={visible}
      title="포스트 삭제"
      description="이벤트를 삭제하시겠습니까?"
      confirmText="삭제"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default AdminEventAskRemoveModalComponent;
