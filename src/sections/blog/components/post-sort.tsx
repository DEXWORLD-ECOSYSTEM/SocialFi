'use client';

import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';
import { usePopover } from 'src/components/custom-popover/hooks';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

type Props = BoxProps & {
  sortBy: string;
  onSortBy: (newValue: string) => void;
};

export function PostSort({ sortBy, onSortBy, sx, ...other }: Props) {
  const popover = usePopover();

  const selectedOption = SORT_OPTIONS.find((option) => option.value === sortBy);

  return (
    <>
      <Box sx={sx} {...other}>
        <Button
          disableRipple
          color="inherit"
          onClick={popover.onOpen}
          endIcon={<Iconify icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'} />}
          sx={{ fontWeight: 'fontWeightSemiBold', textTransform: 'capitalize' }}
        >
          Sort by:
          <Box component="span" sx={{ ml: 0.5, fontWeight: 'fontWeightBold' }}>
            {selectedOption?.label}
          </Box>
        </Button>
      </Box>

      <CustomPopover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose} sx={{ width: 140 }}>
        <MenuList>
          {SORT_OPTIONS.map((option) => (
            <MenuItem
              key={option.value}
              selected={sortBy === option.value}
              onClick={() => {
                popover.onClose();
                onSortBy(option.value);
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover>
    </>
  );
}
