import {describe, it, expect, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BaseInput from './BaseInput';

describe('BaseInput Component', () => {
  const defaultProps = {
    label: 'Username',
    value: '',
    placeholder: 'Enter your username',
    type: 'text',
    onChange: vi.fn(),
  };

  it('should match the snapshot', () => {
    const {asFragment} = render(<BaseInput {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the label and input with correct placeholder and type', () => {
    render(<BaseInput {...defaultProps} />);

    expect(screen.getByText('Username')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Enter your username');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('should display the correct value', () => {
    render(<BaseInput {...defaultProps} value="John Doe" />);

    const input = screen.getByPlaceholderText('Enter your username');
    expect(input).toHaveValue('John Doe');
  });

  it('should be a required field', () => {
    render(<BaseInput {...defaultProps} />);

    const input = screen.getByPlaceholderText('Enter your username');
    expect(input).toBeRequired();
  });

  it('should call onChange handler when typing', async () => {
    const onChangeMock = vi.fn();
    const user = userEvent.setup();

    render(<BaseInput {...defaultProps} onChange={onChangeMock} />);

    const input = screen.getByPlaceholderText('Enter your username');
    await user.type(input, 'a');

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
