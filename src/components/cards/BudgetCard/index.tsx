import { BudgetCategoryRelationResponse, BudgetResponse } from '@/api-client';
import { CalendarToday, Delete, Edit } from '@mui/icons-material';
import {
  BudgetCardBody,
  BudgetCardButtonsRoot,
  BudgetCardHeader,
  BudgetCardRoot,
  SeeMoreButtonContainer,
} from './styles';
import { Box, Grid, Icon, IconButton, Typography } from '@mui/material';
import moment from 'moment';
import { formatCategoryRelationAmount } from '@/utils/formatting';
import { CustomButton } from '@/components/buttons/CustomButton';
import { useState } from 'react';
import { ViewBudgetPopup } from '@/components/popups/budgets/ViewBudgetPopup';
import { EditBudgetPopup } from '@/components/popups/budgets/EditBudgetPopup';
import { ConfirmDeleteBudgetPopup } from '@/components/popups/budgets/ConfirmDeleteBudgetPopup';
import { Colors } from '@/constants/colors';

interface BudgetCardProps {
  budget: BudgetResponse;
  categoryRelations: BudgetCategoryRelationResponse[];
  afterSave: () => unknown;
  afterDelete: () => unknown;
}

export const BudgetCard = ({
  budget,
  categoryRelations,
  afterSave,
  afterDelete,
}: BudgetCardProps) => {
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [confirmDeletePopupOpen, setConfirmDeletePopupOpen] = useState(false);
  const [viewPopupOpen, setViewPopupOpen] = useState(false);

  return (
    <>
      <BudgetCardRoot>
        <BudgetCardHeader>{budget.name}</BudgetCardHeader>
        <BudgetCardBody>
          <BudgetCardButtonsRoot>
            <IconButton onClick={() => setEditPopupOpen(true)}>
              <Edit fontSize='medium' style={{ color: Colors.DARK_GREEN }} />
            </IconButton>
            <IconButton onClick={() => setConfirmDeletePopupOpen(true)}>
              <Delete fontSize='medium' style={{ color: Colors.RED }} />
            </IconButton>
          </BudgetCardButtonsRoot>
          <Box display='flex' flexDirection='row' gap={2} alignItems='center'>
            <CalendarToday
              fontSize='medium'
              style={{ color: Colors.DARK_PURPLE }}
            />
            <Typography fontSize={14}>
              {moment(budget.start_time).format('MM/DD/YY')} -{' '}
              {moment(budget.end_time).format('MM/DD/YY')}
            </Typography>
          </Box>
          <Typography fontSize={14} margin='20px 0' textTransform='capitalize'>
            {budget.interval}
          </Typography>
          <Typography fontSize={14} fontWeight={600}>
            Expense Categories
          </Typography>
          <Grid container>
            {categoryRelations.slice(0, 4).map((categoryRelation) => (
              <Grid item key={categoryRelation.id} xs={6}>
                <Box
                  display='flex'
                  flexDirection='row'
                  gap={2}
                  alignItems='center'
                  key={categoryRelation.id}
                >
                  <Typography fontSize={14}>
                    {categoryRelation.category?.name}
                  </Typography>
                  <Typography fontSize={14}>
                    {formatCategoryRelationAmount(categoryRelation)}
                  </Typography>
                </Box>
              </Grid>
            ))}
            {categoryRelations.length === 0 ? (
              <Typography fontSize={14}>No categories yet</Typography>
            ) : null}
          </Grid>
          <SeeMoreButtonContainer>
            <CustomButton
              variant='contained'
              primaryColor={Colors.DARK_PURPLE}
              secondaryColor={Colors.WHITE}
              onClick={() => setViewPopupOpen(true)}
            >
              See More
            </CustomButton>
          </SeeMoreButtonContainer>
        </BudgetCardBody>
      </BudgetCardRoot>

      <ViewBudgetPopup
        budget={budget}
        categoryRelations={categoryRelations}
        isOpen={viewPopupOpen}
        onClose={() => setViewPopupOpen(false)}
        onOpenEdit={() => {
          setViewPopupOpen(false);
          setEditPopupOpen(true);
        }}
        onOpenConfirmDelete={() => {
          setViewPopupOpen(false);
          setConfirmDeletePopupOpen(true);
        }}
      />

      <EditBudgetPopup
        budget={budget}
        initialCategoryRelations={categoryRelations}
        isOpen={editPopupOpen}
        onClose={() => setEditPopupOpen(false)}
        afterSave={afterSave}
        onOpenView={() => {
          setEditPopupOpen(false);
          setViewPopupOpen(true);
        }}
        onOpenConfirmDelete={() => {
          setEditPopupOpen(false);
          setConfirmDeletePopupOpen(true);
        }}
      />

      <ConfirmDeleteBudgetPopup
        budget={budget}
        isOpen={confirmDeletePopupOpen}
        onClose={() => setConfirmDeletePopupOpen(false)}
        afterDelete={afterDelete}
      />
    </>
  );
};
