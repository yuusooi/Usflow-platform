import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Modal from './index'

// 定义按钮组件，支持双主题
const DemoButton = ({ children, onClick, style = {} }: any) => {
  return (
    <button
      onClick={onClick}
      className="demo-modal-trigger-btn"
      style={{
        padding: '8px 16px',
        background: 'var(--component-bg, #ffffff)',
        color: 'var(--component-text, #37352f)',
        border: '1px solid var(--component-border, rgba(55, 53, 47, 0.16))',
        borderRadius: '4px',
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
    </button>
  )
}

const meta: Meta<typeof Modal> = {
  title: '反馈交互/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      story: {
        // 确保 Docs 里的组件在独立的 iframe 中渲染，完全隔离不受外界干扰！
        inline: false,
        iframeHeight: 500,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: '500px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <style>{`
          .demo-modal-trigger-btn:hover {
            background: var(--component-hover-bg, rgba(55, 53, 47, 0.04)) !important;
          }
        `}</style>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    visible: {
      control: 'boolean',
      description: '是否显示弹窗',
    },
    title: {
      control: 'text',
      description: '弹窗标题',
    },
    width: {
      control: 'number',
      description: '弹窗宽度',
    },
    maskClosable: {
      control: 'boolean',
      description: '点击遮罩是否关闭',
    },
    closable: {
      control: 'boolean',
      description: '是否显示关闭按钮',
    },
  },
}

export default meta
type Story = StoryObj<typeof Modal>

// ============ 基础用法 ============

export const Basic: Story = {
  render: () => {
    const [visible, setVisible] = useState(false)

    return (
      <div>
        <DemoButton onClick={() => setVisible(true)}>打开弹窗</DemoButton>

        <Modal
          visible={visible}
          title="基础弹窗"
          onCancel={() => setVisible(false)}
          onOk={() => setVisible(false)}
        >
          <p>这是一个基础的 Modal 弹窗示例。</p>
        </Modal>
      </div>
    )
  },
}

export const NoTitle: Story = {
  render: () => {
    const [visible, setVisible] = useState(false)

    return (
      <div>
        <DemoButton onClick={() => setVisible(true)}>打开无标题弹窗</DemoButton>

        <Modal
          visible={visible}
          onCancel={() => setVisible(false)}
          onOk={() => setVisible(false)}
        >
          <p>这是一个没有标题的弹窗。</p>
          <p>只有内容区域和底部按钮。</p>
        </Modal>
      </div>
    )
  },
}

export const NoFooter: Story = {
  render: () => {
    const [visible, setVisible] = useState(false)

    return (
      <div>
        <DemoButton onClick={() => setVisible(true)}>打开无底部弹窗</DemoButton>

        <Modal
          visible={visible}
          title="无底部按钮"
          footer={null}
          onCancel={() => setVisible(false)}
        >
          <p>这个弹窗没有底部按钮。</p>
          <p>点击右上角的 ✕ 或遮罩层关闭。</p>
        </Modal>
      </div>
    )
  },
}

export const CustomFooter: Story = {
  render: () => {
    const [visible, setVisible] = useState(false)

    return (
      <div>
        <DemoButton onClick={() => setVisible(true)}>自定义底部按钮</DemoButton>

        <Modal
          visible={visible}
          title="自定义底部"
          footer={
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px',
              }}
            >
              <button
                onClick={() => setVisible(false)}
                style={{
                  padding: '6px 16px',
                  border: '1px solid var(--component-border)',
                  background: 'var(--component-bg)',
                  color: 'var(--component-text)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                暂不保存
              </button>
              <button
                onClick={() => {
                  alert('保存成功')
                  setVisible(false)
                }}
                style={{
                  padding: '6px 16px',
                  border: '1px solid var(--primary-color, #165dff)',
                  background: 'var(--primary-color, #165dff)',
                  color: 'var(--primary-text-color, white)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                保存
              </button>
            </div>
          }
          onCancel={() => setVisible(false)}
        >
          <p>这是自定义底部按钮的弹窗。</p>
          <p>你可以自由配置按钮的数量和样式。</p>
        </Modal>
      </div>
    )
  },
}

// ============ 交互配置 ============

export const MaskNotClosable: Story = {
  render: () => {
    const [visible, setVisible] = useState(false)

    return (
      <div>
        <DemoButton onClick={() => setVisible(true)}>
          禁止点击遮罩关闭
        </DemoButton>

        <Modal
          visible={visible}
          title="重要提示"
          maskClosable={false}
          onCancel={() => setVisible(false)}
          onOk={() => setVisible(false)}
        >
          <p
            style={{
              color: 'var(--error-color, #ff4d4f)',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
          >
            ⚠️ 注意！
          </p>
          <p>这个弹窗禁止点击遮罩层关闭。</p>
          <p>你必须点击"确定"或"取消"按钮，或按 ESC 键才能关闭。</p>
        </Modal>
      </div>
    )
  },
}

export const NotClosable: Story = {
  render: () => {
    const [visible, setVisible] = useState(false)

    return (
      <div>
        <DemoButton onClick={() => setVisible(true)}>隐藏关闭按钮</DemoButton>

        <Modal
          visible={visible}
          title="不可关闭的弹窗"
          closable={false}
          onCancel={() => setVisible(false)}
          onOk={() => setVisible(false)}
        >
          <p>这个弹窗右上角的关闭按钮被隐藏了。</p>
          <p>你只能通过底部按钮或点击遮罩层来关闭它。</p>
        </Modal>
      </div>
    )
  },
}

export const ForceConfirm: Story = {
  render: () => {
    const [visible, setVisible] = useState(false)

    return (
      <div>
        <button
          onClick={() => setVisible(true)}
          style={{
            padding: '8px 16px',
            background: 'var(--error-color, #ff4d4f)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          强制确认弹窗
        </button>

        <Modal
          visible={visible}
          title="重要操作确认"
          maskClosable={false}
          closable={false}
          footer={
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px',
              }}
            >
              <button
                onClick={() => {
                  alert('你选择了取消')
                  setVisible(false)
                }}
                style={{
                  padding: '6px 16px',
                  border: '1px solid var(--component-border)',
                  background: 'var(--component-bg)',
                  color: 'var(--component-text)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                取消操作
              </button>
              <button
                onClick={() => {
                  alert('你确认了操作')
                  setVisible(false)
                }}
                style={{
                  padding: '6px 16px',
                  border: '1px solid var(--error-color, #ff4d4f)',
                  background: 'var(--error-color, #ff4d4f)',
                  color: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                确认删除
              </button>
            </div>
          }
        >
          <p
            style={{ color: 'var(--error-color, #ff4d4f)', fontWeight: 'bold' }}
          >
            ⚠️ 此操作不可恢复！
          </p>
          <p>删除后数据将永久丢失，请谨慎操作。</p>
        </Modal>
      </div>
    )
  },
}

// ============ 宽度变体 ============

export const Small: Story = {
  render: () => {
    const [visible, setVisible] = useState(false)

    return (
      <div>
        <DemoButton onClick={() => setVisible(true)}>
          小尺寸弹窗 (400px)
        </DemoButton>

        <Modal
          visible={visible}
          title="小尺寸弹窗"
          width={400}
          onCancel={() => setVisible(false)}
          onOk={() => setVisible(false)}
        >
          <p>这是一个宽度为 400px 的弹窗。</p>
        </Modal>
      </div>
    )
  },
}

export const Large: Story = {
  render: () => {
    const [visible, setVisible] = useState(false)

    return (
      <div>
        <DemoButton onClick={() => setVisible(true)}>
          大尺寸弹窗 (800px)
        </DemoButton>

        <Modal
          visible={visible}
          title="大尺寸弹窗"
          width={800}
          onCancel={() => setVisible(false)}
          onOk={() => setVisible(false)}
        >
          <p>这是一个宽度为 800px 的大尺寸弹窗。</p>
          <p>适合展示更多内容或表单。</p>
          <div
            style={{
              height: '200px',
              background: 'var(--component-hover-bg, #f5f5f5)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            内容区域示例
          </div>
        </Modal>
      </div>
    )
  },
}

export const FullScreen: Story = {
  render: () => {
    const [visible, setVisible] = useState(false)

    return (
      <div>
        <DemoButton onClick={() => setVisible(true)}>全屏弹窗</DemoButton>

        <Modal
          visible={visible}
          title="全屏弹窗"
          width="100%"
          onCancel={() => setVisible(false)}
          onOk={() => setVisible(false)}
        >
          <p>这是一个宽度为 100% 的全屏弹窗。</p>
          <p>适合展示大量内容或全屏表单。</p>
        </Modal>
      </div>
    )
  },
}

// ============ 实际应用场景 ============

export const ConfirmDelete: Story = {
  render: () => {
    const [visible, setVisible] = useState(false)

    const handleDelete = () => {
      alert('已删除')
      setVisible(false)
    }

    return (
      <div>
        <button
          onClick={() => setVisible(true)}
          style={{
            padding: '8px 16px',
            background: 'var(--error-color, #ff4d4f)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          删除项目
        </button>

        <Modal
          visible={visible}
          title="确认删除"
          maskClosable={false}
          footer={
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px',
              }}
            >
              <button
                onClick={() => setVisible(false)}
                style={{
                  padding: '6px 16px',
                  border: '1px solid var(--component-border)',
                  background: 'var(--component-bg)',
                  color: 'var(--component-text)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                取消
              </button>
              <button
                onClick={handleDelete}
                style={{
                  padding: '6px 16px',
                  border: '1px solid var(--error-color, #ff4d4f)',
                  background: 'var(--error-color, #ff4d4f)',
                  color: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                删除
              </button>
            </div>
          }
          onCancel={() => setVisible(false)}
        >
          <p>确定要删除这个项目吗？</p>
          <p style={{ color: 'var(--error-color, #ff4d4f)' }}>
            此操作不可恢复！
          </p>
        </Modal>
      </div>
    )
  },
}

export const FormModal: Story = {
  render: () => {
    const [visible, setVisible] = useState(false)

    const handleSubmit = () => {
      alert('表单已提交')
      setVisible(false)
    }

    return (
      <div>
        <DemoButton onClick={() => setVisible(true)}>编辑用户信息</DemoButton>

        <Modal
          visible={visible}
          title="编辑用户信息"
          width={600}
          onCancel={() => setVisible(false)}
          onOk={handleSubmit}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontWeight: 'bold',
                }}
              >
                用户名
              </label>
              <input
                type="text"
                placeholder="请输入用户名"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid var(--component-border)',
                  background: 'var(--component-bg)',
                  color: 'var(--component-text)',
                  borderRadius: '4px',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontWeight: 'bold',
                }}
              >
                邮箱
              </label>
              <input
                type="email"
                placeholder="请输入邮箱"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid var(--component-border)',
                  background: 'var(--component-bg)',
                  color: 'var(--component-text)',
                  borderRadius: '4px',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontWeight: 'bold',
                }}
              >
                个人简介
              </label>
              <textarea
                placeholder="请输入个人简介"
                rows={3}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid var(--component-border)',
                  background: 'var(--component-bg)',
                  color: 'var(--component-text)',
                  borderRadius: '4px',
                  resize: 'vertical',
                }}
              />
            </div>
          </div>
        </Modal>
      </div>
    )
  },
}

export const DetailModal: Story = {
  render: () => {
    const [visible, setVisible] = useState(false)

    return (
      <div>
        <DemoButton onClick={() => setVisible(true)}>查看用户详情</DemoButton>

        <Modal
          visible={visible}
          title="用户详情"
          width={600}
          footer={
            <button
              onClick={() => setVisible(false)}
              style={{
                padding: '6px 16px',
                border: '1px solid var(--primary-color, #165dff)',
                background: 'var(--primary-color, #165dff)',
                color: 'var(--primary-text-color, white)',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              关闭
            </button>
          }
          onCancel={() => setVisible(false)}
        >
          <div style={{ lineHeight: '1.8' }}>
            <p>
              <strong>姓名：</strong>张三
            </p>
            <p>
              <strong>年龄：</strong>28 岁
            </p>
            <p>
              <strong>邮箱：</strong>zhangsan@example.com
            </p>
            <p>
              <strong>手机：</strong>13800138000
            </p>
            <p>
              <strong>地址：</strong>北京市朝阳区
            </p>
            <p>
              <strong>注册时间：</strong>2024-01-01
            </p>
            <p>
              <strong>状态：</strong>
              <span style={{ color: 'var(--success-color, #52c41a)' }}>
                活跃
              </span>
            </p>
          </div>
        </Modal>
      </div>
    )
  },
}

export const ImagePreview: Story = {
  render: () => {
    const [visible, setVisible] = useState(false)

    return (
      <div>
        <DemoButton onClick={() => setVisible(true)}>查看图片</DemoButton>

        <Modal
          visible={visible}
          title="图片预览"
          width={800}
          footer={
            <button
              onClick={() => setVisible(false)}
              style={{
                padding: '6px 16px',
                border: '1px solid var(--primary-color, #165dff)',
                background: 'var(--primary-color, #165dff)',
                color: 'var(--primary-text-color, white)',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              关闭
            </button>
          }
          onCancel={() => setVisible(false)}
        >
          <div
            style={{
              width: '100%',
              height: '400px',
              background: 'var(--component-hover-bg, gray)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-color-secondary)',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            图片预览区域
          </div>
        </Modal>
      </div>
    )
  },
}

export const LongContent: Story = {
  render: () => {
    const [visible, setVisible] = useState(false)

    return (
      <div>
        <DemoButton onClick={() => setVisible(true)}>长内容弹窗</DemoButton>

        <Modal
          visible={visible}
          title="用户协议"
          width={600}
          footer={
            <button
              onClick={() => {
                alert('已同意协议')
                setVisible(false)
              }}
              style={{
                padding: '6px 16px',
                border: '1px solid var(--primary-color, #165dff)',
                background: 'var(--primary-color, #165dff)',
                color: 'var(--primary-text-color, white)',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              我已阅读并同意
            </button>
          }
          onCancel={() => setVisible(false)}
        >
          <div style={{ lineHeight: '1.8' }}>
            <h4>第一章 总则</h4>
            <p>
              第一条
              为规范公司用户管理，保护用户合法权益，制定本协议。请用户仔细阅读以下内容，并点击"同意"按钮完成注册流程。
            </p>
            <p>
              第二条
              用户注册成功后，公司将为用户生成账号，该账号由用户自行保管。
            </p>
            <p>
              第三条
              用户在使用本服务过程中，必须遵守相关法律法规，不得利用本服务从事违法违规活动。
            </p>
            <p>
              第四条
              用户承诺所提供的信息真实、准确、完整，不得包含虚假或误导性内容。
            </p>
            <p>
              第五条
              公司有权根据业务需要，对本协议内容进行修改，修改后的协议将通过网站公告等方式告知用户。
            </p>
            <p>
              第六条 如用户违反本协议约定，公司有权暂停或终止向用户提供服务。
            </p>
            <p>
              第七条 本协议的解释权归公司所有。如发生争议，双方应友好协商解决。
            </p>
            <p>第八条 本协议自用户点击同意之日起生效。</p>
            <h4>第二章 账户管理</h4>
            <p>
              第九条
              用户应妥善保管账号和密码，因用户保管不当导致的损失，由用户自行承担。
            </p>
            <p>第十条 用户不得将账号转让、出借或出售给他人使用。</p>
          </div>
        </Modal>
      </div>
    )
  },
}

export const MultiStep: Story = {
  render: () => {
    const [visible, setVisible] = useState(false)
    const [step, setStep] = useState(1)

    const nextStep = () => {
      if (step < 3) setStep(step + 1)
    }

    const prevStep = () => {
      if (step > 1) setStep(step - 1)
    }

    const handleFinish = () => {
      alert('操作完成')
      setVisible(false)
      setStep(1)
    }

    return (
      <div>
        <DemoButton onClick={() => setVisible(true)}>多步骤操作</DemoButton>

        <Modal
          visible={visible}
          title={`向导（第 ${step} 步 / 共 3 步）`}
          width={600}
          onCancel={() => {
            setVisible(false)
            setStep(1)
          }}
          footer={
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px',
              }}
            >
              <button
                onClick={() => {
                  setVisible(false)
                  setStep(1)
                }}
                style={{
                  padding: '6px 16px',
                  border: '1px solid var(--component-border)',
                  background: 'var(--component-bg)',
                  color: 'var(--component-text)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                取消
              </button>
              {step > 1 && (
                <button
                  onClick={prevStep}
                  style={{
                    padding: '6px 16px',
                    border: '1px solid var(--component-border)',
                    background: 'var(--component-bg)',
                    color: 'var(--component-text)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  上一步
                </button>
              )}
              {step < 3 ? (
                <button
                  onClick={nextStep}
                  style={{
                    padding: '6px 16px',
                    border: '1px solid var(--primary-color, #165dff)',
                    background: 'var(--primary-color, #165dff)',
                    color: 'var(--primary-text-color, white)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  下一步
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  style={{
                    padding: '6px 16px',
                    border: '1px solid var(--success-color, #52c41a)',
                    background: 'var(--success-color, #52c41a)',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  完成
                </button>
              )}
            </div>
          }
        >
          {step === 1 && (
            <div>
              <h4>第一步：选择类型</h4>
              <p>请选择您要创建的项目类型：</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  style={{
                    padding: '8px 16px',
                    border: '1px solid var(--component-border)',
                    background: 'var(--component-bg)',
                    color: 'var(--component-text)',
                    borderRadius: '4px',
                  }}
                >
                  个人项目
                </button>
                <button
                  style={{
                    padding: '8px 16px',
                    border: '1px solid var(--component-border)',
                    background: 'var(--component-bg)',
                    color: 'var(--component-text)',
                    borderRadius: '4px',
                  }}
                >
                  团队项目
                </button>
                <button
                  style={{
                    padding: '8px 16px',
                    border: '1px solid var(--component-border)',
                    background: 'var(--component-bg)',
                    color: 'var(--component-text)',
                    borderRadius: '4px',
                  }}
                >
                  企业项目
                </button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h4>第二步：填写信息</h4>
              <p>请填写项目基本信息：</p>
              <input
                type="text"
                placeholder="项目名称"
                style={{
                  width: '100%',
                  padding: '8px',
                  marginBottom: '8px',
                  border: '1px solid var(--component-border)',
                  background: 'var(--component-bg)',
                  color: 'var(--component-text)',
                  borderRadius: '4px',
                }}
              />
              <textarea
                placeholder="项目描述"
                rows={3}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid var(--component-border)',
                  background: 'var(--component-bg)',
                  color: 'var(--component-text)',
                  borderRadius: '4px',
                }}
              />
            </div>
          )}
          {step === 3 && (
            <div>
              <h4>第三步：确认信息</h4>
              <p>请确认您的填写信息：</p>
              <div
                style={{
                  padding: '16px',
                  background: 'var(--component-hover-bg)',
                  borderRadius: '4px',
                }}
              >
                <p>
                  <strong>类型：</strong>个人项目
                </p>
                <p>
                  <strong>名称：</strong>（待填写）
                </p>
                <p>
                  <strong>描述：</strong>（待填写）
                </p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    )
  },
}

export const SuccessModal: Story = {
  render: () => {
    const [visible, setVisible] = useState(false)

    return (
      <div>
        <button
          onClick={() => setVisible(true)}
          style={{
            padding: '8px 16px',
            background: 'var(--success-color, #52c41a)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          操作成功
        </button>

        <Modal
          visible={visible}
          title="操作成功"
          footer={
            <button
              onClick={() => setVisible(false)}
              style={{
                padding: '6px 16px',
                border: '1px solid var(--success-color, #52c41a)',
                background: 'var(--success-color, #52c41a)',
                color: 'white',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              好的
            </button>
          }
          onCancel={() => setVisible(false)}
        >
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 16px',
                background: 'var(--success-color, #52c41a)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '32px',
                fontWeight: 'bold',
              }}
            >
              ✓
            </div>
            <p
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              操作成功！
            </p>
            <p style={{ color: 'var(--text-color-secondary)' }}>
              您的数据已成功保存
            </p>
          </div>
        </Modal>
      </div>
    )
  },
}

export const WarningModal: Story = {
  render: () => {
    const [visible, setVisible] = useState(false)

    return (
      <div>
        <button
          onClick={() => setVisible(true)}
          style={{
            padding: '8px 16px',
            background: 'var(--warning-color, #faad14)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          警告提示
        </button>

        <Modal
          visible={visible}
          title="警告"
          footer={
            <button
              onClick={() => setVisible(false)}
              style={{
                padding: '6px 16px',
                border: '1px solid var(--warning-color, #faad14)',
                background: 'var(--warning-color, #faad14)',
                color: 'white',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              我知道了
            </button>
          }
          onCancel={() => setVisible(false)}
        >
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 16px',
                background: 'var(--warning-color, #faad14)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '32px',
                fontWeight: 'bold',
              }}
            >
              !
            </div>
            <p
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              请注意！
            </p>
            <p style={{ color: 'var(--text-color-secondary)' }}>
              您的操作可能会导致数据丢失
            </p>
          </div>
        </Modal>
      </div>
    )
  },
}
