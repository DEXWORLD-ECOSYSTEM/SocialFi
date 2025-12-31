'use client';

import { usePopover } from 'minimal-shared/hooks';

import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  sort: string;
  onSort: (newValue: string) => void;
  sortOptions: { value: string; label: string }[];
};

export function PostSort({ sort, sortOptions, onSort, sx, ...other }: Props) {
  const menuActions = usePopover();

  // Encontra o rótulo (label) correspondente ao valor (value) atual para exibir no botão
  const selectedOption = sortOptions.find((option) => option.value === sort);

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'top-right' } }}
    >
      <MenuList>
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={sort === option.value}
            onClick={() => {
              menuActions.onClose();
              onSort(option.value);
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <Box sx={sx} {...other}>
        <Button
          disableRipple
          color="inherit"
          onClick={menuActions.onOpen}
          endIcon={
            <Iconify
              icon={menuActions.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            />
          }
          sx={{ fontWeight: 'fontWeightSemiBold', textTransform: 'capitalize' }}
        >
          Sort by:
          <Box component="span" sx={{ ml: 0.5, fontWeight: 'fontWeightBold', color: 'text.secondary' }}>
            {selectedOption ? selectedOption.label : sort}
          </Box>
        </Button>
      </Box>

      {renderMenuActions()}
    </>
  );
}