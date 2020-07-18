type AlertType = 'success' | 'info' | 'warning' | 'error';

export type AlertDefaultProps = {
  message: string;
  type: AlertType;
  description?: string;
  closable?: boolean;
  closeText?: string;
  banner?: boolean;
  showIcon?: boolean;
  contrast?: boolean;
};

export const defaultData = {
  message: 'This is the default message data',
  type: 'info',
  description:
    'This is the default description data, it could be a long long text!',
  closable: true,
  closeText: 'Close text',
  banner: false,
  showIcon: true,
  contrast: false,
};

export const formFields = [
  { name: 'message', type: 'string', initialValue: defaultData.message },
  {
    name: 'type',
    type: 'select',
    selector: 'radio-group',
    options: [
      { success: 'Success' },
      { info: 'Info' },
      { warning: 'Warning' },
      { error: 'Error' },
    ],
    initialValue: defaultData.type,
  },
  {
    name: 'description',
    type: 'string',
    initialValue: defaultData.description,
  },
  { name: 'closable', type: 'boolean', initialValue: defaultData.closable },
  { name: 'closeText', type: 'string', initialValue: defaultData.closeText },
  { name: 'banner', type: 'boolean', initialValue: defaultData.banner },
  {
    name: 'showIcon',
    type: 'boolean',
    initialValue: defaultData.message,
  },
  {
    name: 'constrast',
    type: 'boolean',
    initialValue: defaultData.contrast,
  },
];
