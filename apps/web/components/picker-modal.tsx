"use client"
import FilledInput from '@repo/ui/filled-input';
import { Loader2Icon } from 'lucide-react';
import { useMemo, useState } from 'react';
import Modal from 'react-modal';

type PickerModalProps = {
    options?: {
        icon: React.ReactNode
        label: string
        description: string
        value: string
    }[],
    onOptionSelected?: (value: string) => void
    children?: React.ReactNode
    searchLabel?: string
}

export default function PickerModal(props: PickerModalProps) {
    const [modalIsOpen, setIsOpen] = useState(false);

    const [filter, setFilter] = useState('')

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const filteredOptions = useMemo(() => {
        if (!filter) return props.options

        return props.options?.filter(option => {
            return (
                option.label.toLowerCase().includes(filter.toLowerCase()) ||
                option.description.toLowerCase().includes(filter.toLowerCase()) ||
                option.value.toLowerCase().includes(filter.toLowerCase())
            )
        })
    }, [props.options, filter])

    return <div>
        <div onClick={openModal}>
            {props.children}
        </div>
        <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onAfterOpen={() => { }}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            style={{
                overlay: {
                    zIndex: 20,
                },
                content: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                }
            }}
        >
            <FilledInput
                label={props.searchLabel}
                placeholder='Search...'
                className='sticky top-0'
                value={filter}
                onChange={e => setFilter(e.target.value)}
            />
            {filteredOptions?.map(option => <button
                type='button'
                key={option.value}
                className='rounded-md flex items-center px-5 py-2 gap-5 bg-primary hover:bg-primary-strong'
                onClick={() => {
                    props.onOptionSelected?.(option.value)
                    closeModal()
                }}
            >
                {option.icon}
                <div className='text-left'>
                    <p>{option.label}</p>
                    <p className='text-xs'>{option.description}</p>
                </div>
            </button>)}

            {!props.options && <div className='py-10 flex justify-center'>
                <Loader2Icon className='animate-spin' />
            </div>}

            {filteredOptions?.length === 0 && <div className='py-10 flex justify-center'>
                <p className='text-gray-500'>No results</p>
            </div>}
        </Modal>
    </div>
}